const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

// router.delete("/:userId", (req, res, next) => {
// 	User.deleteOne({ _id: req.params.userId })
// 		.exec()
// 		.then(result => {
// 			res.status(200).json({
// 				message: "User deleted"
// 			});
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({
// 				error: err
// 			});
// 		});
// });
