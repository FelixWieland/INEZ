import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbRequests from "../dbRequests";

export const register = (req, res, next) => {
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

export const login = (req, res, next) => {
	dbRequests.getUser(req.body.userName, (err, data) => {
		if (!data) {
			return res.status(404).json({
				message: "user nicht gefunden!"
			});
		}
		dbRequests.getPasswordhash(req.body.userName, (pwError, pwData) => {
			if (pwError) {
				return res.status(401).json({ message: "Auth failed" });
			}
			bcrypt.compare(req.body.password, pwData, (bcryptErr, result) => {
				if (bcryptErr) {
					return res.status(401).json({
						message: "Auth failed"
					});
				}

				return responseJWT(
					res,
					"User succesfully logged in",
					200,
					req.body.userName
				);
			});
		});
	});
};

export const getUser = (req, res, next) => {
	//quick and dirty, aber läuft :D
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.verify(token, process.env.JWT_KEY);
	req.userData = decoded;
	const decodedUser = decoded.userName;
	res.status(200).json({ userName: decodedUser });
};

export const extractUser = (req) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt.verify(token, process.env.JWT_KEY);
	return decoded.userName;
}

//function that provides the jwt
const responseJWT = (res, message, resCode, userName) => {
	const token = jwt.sign(
		{
			userName: userName
		},
		process.env.JWT_KEY,
		{
			expiresIn: "1h"
		}
	);
	return res.status(resCode).json({
		message: message,
		jwt: token
	});
};
