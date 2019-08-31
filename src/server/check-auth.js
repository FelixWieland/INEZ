const jwt = require("jsonwebtoken");

export const checkAuth = (req, res, next) => {
	try {
		//const token = req.headers.authorization.split(" ")[1];
		const token = req.query.jwt.split(" ")[1]
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		next();
	} catch (error) {
		console.log(error)
		return res.status(401).json({
			message: "Auth failed!"
		});
	}
};
