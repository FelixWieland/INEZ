const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/register", (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				//checks if a user with this name already exists
				return res.status(409).json({
					message: "user already exists!"
				});
			} else {
				//if not hash the password
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash //take the hashed password
						});
						user
							.save()
							.then(result => {
								const token = jwt.sign(
									{
										email: user[0].email,
										userId: user[0]._id
									},
									process.env.JWT_KEY,
									{
										expiresIn: "1h"
									}
								);
								return res.status(200).json({
									message: "User was succesfully created",
									token: token
								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
					}
				});
			}
		});
});

router.post("/login", (req, res, next) => {
	User.find({ email: req.body.email })
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
							email: user[0].email,
							userId: user[0]._id
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
module.exports = router;
