import dbRequests from "../dbRequests";

export const getCroceryLists = (req, res, next) => {
	dbRequests.getUser(req.body.userName, (err, data) => {
		if (data) {
			return res.status(409).json({
				message: "user already exists!"
			});
		}
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) {
				return res.status(500).json({
					error: err
				});
			}
			dbRequests.createUser(req.body.userName, hash, (err, data) => {
				if (err) {
					return res.status(500).json({
						error: err
					});
				}
				responseJWT(res, "User succesfully created", 201, req.body.userName);
			});
		});
	});
};
