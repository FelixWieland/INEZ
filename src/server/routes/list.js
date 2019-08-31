import dbRequests from "../dbRequests";
import { extractUser } from "./user.js";

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
