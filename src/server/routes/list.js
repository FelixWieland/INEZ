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
	res.status(200).json({
		message: "Test"
	});
};

export const deleteGroceryList = (req, res, next) => {
	res.status(200).json({
		message: "Test"
	});
};

export const getGroceryListGroups = (req, res, next) => {};
