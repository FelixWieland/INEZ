import dbRequests from "../dbRequests";
import { extractUser } from "./user";
import * as db from './../dbRequests'

export const getGroceryLists = (req, res, next) => {
	res.status(200).json({
		message: "Test"
	});
};


export const getGroceryListGroups = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'liste existiert nicht' });
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.getAllItemsInShoppingList(elm._id, (err, result) => {
					if (err) {
						return res.status(500).json({ message: 'liste existiert nicht' });
					}
					return res.status(200).json(result)
				})
			}

		})

	})
}

export const createProductGroup = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'liste existiert nicht' });
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.createShoppingListGroup(elm._id, req.body.groupname, (err, result) => {
					if (err) {
						return res.status(500).json({ message: 'liste existiert nicht' });
					}
					return res.status(200).json({ message: 'liste wurde angelegt' })
				})
			}
		})
	})
}

export const deleteProductGroup = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'liste existiert nicht' });
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.deleteShoppingListGroup(elm._id, req.body.groupname, (err, result) => {
					if (err) {
						return res.status(500).json({ message: 'liste existiert nicht' });
					}
					return res.status(200).json({ message: 'liste wurde gelöscht' })
				})
			}
		})
	})
}