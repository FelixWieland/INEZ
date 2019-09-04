import dbRequests from '../dbRequests'
import { extractUser } from './user'
import * as db from './../dbRequests'

export const getGroceryLists = (req, res, next) => {
	const decodedUser = extractUser(req)
	dbRequests.getShoppingLists(decodedUser, (err, data) => {
		if (data) {
			return res.status(200).json({
				grocerylists: data.map((elm) => {
					return {
						_id: elm._id,
						list_name: elm.list_name,
					}
				}),
			})
		}
		if (err) {
			return res.status(500).json({
				error: err,
			})
		}
	})
}

export const createGroceryList = (req, res, next) => {
	const decodedUser = extractUser(req)
	dbRequests.createShoppingList(decodedUser, req.body.listname, (err, data) => {
		if (data) {
			return res.status(200).json({
				message: 'succesfully created',
				listname: req.body.listname,
			})
		}
		if (err) {
			return res.status(500).json({
				error: err,
			})
		}
	})
}

export const getGroceryListGroups = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'liste existiert nicht' })
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.getAllItemsInShoppingList(elm._id, (err, result) => {
					if (err) {
						return res.status(500).json({ message: 'liste existiert nicht' })
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
			return res.status(500).json({ message: 'liste existiert nicht' })
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.createShoppingListGroup(
					elm._id,
					req.body.groupname,
					(createGroupErr, result) => {
						if (createGroupErr) {
							console.log(err)
							sendResponse = true
							return res.status(500).json({ message: 'gruppe existiert bereits' })
						}
						return res.status(200).json({ message: 'liste wurde angelegt' })
					}
				)
			}
		})
	})
}

export const deleteProductGroup = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'liste existiert nicht' })
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.deleteShoppingListGroup(
					elm._id,
					req.body.groupname,
					(err, result) => {
						if (err) {
							return res.status(500).json({ message: 'liste existiert nicht' })
						}
						return res.status(200).json({ message: 'liste wurde gelöscht' })
					}
				)
			}
		})
	})
}

export const deleteGroceryList = (req, res, next) => {
	const decodedUser = extractUser(req)
	dbRequests.getShoppingLists(decodedUser, (err, data) => {
		if (data) {
			data.forEach((dataElement) => {
				if (dataElement.list_name == req.body.listname) {
					const deleteListID = dataElement._id
					dbRequests.deleteShoppingList(
						decodedUser,
						deleteListID,
						(err, data) => {
							if (data) {
								return res.status(200).json({
									message: 'succesfully deleted',
									listname: req.body.listname,
								})
							}
							if (err) {
								return res.status(500).json({
									error: err,
								})
							}
						}
					)
				}
			})
		}
		if (err) {
			return res.status(500).json({
				error: err,
			})
		}
	})
}

export const addProductToGroup = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'liste existiert nicht' })
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.addProductToShoppingList(
					elm._id,
					req.params.groupname,
					req.body.productId,
					req.body.productGroupId,
					req.body.productname,
					req.body.measure,
					req.body.amount,
					req.body.checked,
					(err, result) => {
						if (err) {
							console.log(err)
							return res.status(500).json({ message: 'Fehler beim hinzufügen des Items' })
						}
						return res.status(200).json({ message: 'liste wurde angelegt' })
					}
				)
			}
		})
	})
}

export const updateProduct = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Keine Liste vorhanden' })
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.updateProductInGroup(
					elm._id,
					req.params.groupname,
					{
						_id: req.body.productId,
						name: req.body.productname,
						measure: req.body.measure,
						amount: req.body.amount,
						checked: req.body.checked,
					},
					(err, result) => {
						if (err) {
							return res
								.status(500)
								.json({ message: 'Update funktioniert nicht' })
						}
						return res
							.status(200)
							.json({ message: 'liste wurde aktualisiert' })
					}
				)
			}
		})
	})
}

export const deleteProduct = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Keine Liste vorhanden' })
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.removeProductFromShoppingList(
					elm._id,
					req.params.groupname,
					req.body.productname,
					(err, result) => {
						if (err) {
							return res
								.status(500)
								.json({ message: 'Produkt konnte nicht gelöscht werden' })
						}
						return res
							.status(200)
							.json({ message: 'Produkt erfolgreich gelöscht' })
					}
				)
			}
		})
	})
}

export const changeProductGroup = (req, res, next) => {
	const username = extractUser(req)
	db.getShoppingLists(username, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Keine Liste vorhanden' })
		}
		result.map((elm) => {
			if (elm.list_name === req.params.listname) {
				db.changeProductGroup(
					elm._id,
					req.params.groupname,
					req.params.newgroupname,
					req.body.productname,
					(ierr) => {
						if (ierr) {
							return res.status(500).json({ message: ierr.message })
						}
						return res.status(200).json({ message: 'ok' })
					})
			}
		})
	})
}
