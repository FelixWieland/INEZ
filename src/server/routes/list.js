import dbRequests from "../dbRequests";

export const getGroceryLists = (req, res, next) => {
	res.status(200).json({
		message: "Test"
	});
};
