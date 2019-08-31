const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import dbRequests from "../dbRequests";

export const register = (req, res, next) => {
	console.log(req.body);
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
		token: token
	});
};

router.post("/login", (req, res, next) => {
	User.find({ userName: req.body.userName })
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: "Auth failed"
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: "Auth failed"
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							userName: user[0].userName
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1h"
						}
					);
					return res.status(200).json({
						message: "Auth succesful",
						token: token
					});
				}
				//if I make it till here, auth failed again
				res.status(401).json({
					message: "Auth failed"
				});
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

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
