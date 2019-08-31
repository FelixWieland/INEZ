import dbRequests from "../dbRequests";
import { extractUser } from "./user";
import * as db from './../dbRequests'

export const getGroceryLists = (req, res, next) => {
	const decodedUser = extractUser(req);
	dbRequests.getShoppingLists(decodedUser, (err, data) => {
		if (data) {
			return res.status(200).json({
				grocerylists: data
			});
		}
		if (err) {
			return res.status(500).json({
				error: err
			});
		}
	});
};

export const createGroceryList = (req, res, next) => {
	const decodedUser = extractUser(req);
	dbRequests.createShoppingList(decodedUser, req.body.listname, (err, data) => {
		if (data) {
			return res.status(200).json({
				message: "succesfully created",
				listname: req.body.listname
			});
		}
		if (err) {
			return res.status(500).json({
				error: err
			});
		}
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
	console.log(username)
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

export const deleteGroceryList = (req, res, next) => {
	const decodedUser = extractUser(req);
	dbRequests.getShoppingLists(decodedUser, (err, data) => {
		if (data) {
			data.forEach(dataElement => {
				if (dataElement.list_name == req.body.listname) {
					const deleteListID = dataElement._id;
					dbRequests.deleteShoppingList(
						decodedUser,
						deleteListID,
						(err, data) => {
							if (data) {
								return res.status(200).json({
									message: "succesfully deleted",
									listname: req.body.listname
								});
							}
							if (err) {
								return res.status(500).json({
									error: err
								});
							}
						}
					);
				}
			});
		}
		if (err) {
			return res.status(500).json({
				error: err
			});
		}
	});
};

//export const getGroceryListGroups = (req, res, next) => {};
