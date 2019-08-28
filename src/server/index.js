import express, { static as staticFiles } from "express";
import { userInfo } from "os";
import { connect } from "./config/mongoconf";
import fs from "fs";
import path from "path";
import * as jwt from "jsonwebtoken";
import * as db from "./dbRequests";
const bcrypt = require("bcrypt");
const saltRounds = "FFF12345678";
const myPlaintextPassword = "s0//P4$$w0rD"; // comes in after post request
const someOtherPlaintextPassword = "not_bacon"; // comparisin value from dbquery

//salt and hash
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	// Store hash in your password DB.
});

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
	// res == true
});

//authenticate input against database
UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({ email: email }).exec(function(err, user) {
		if (err) {
			return callback(err);
		} else if (!user) {
			var err = new Error("User not found.");
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, user.password, function(err, result) {
			if (result === true) {
				return callback(null, user);
			} else {
				return callback();
			}
		});
	});
};

const app = express();

let credentials = JSON.parse(
	fs
		.readFileSync(
			path.dirname(require.main.filename) + "/config/credentials.json"
		)
		.toString()
);
let conn = undefined;
(async () => {
	conn = await connect(
		credentials.mongo.srv,
		"INEZ"
	);
})();
credentials = undefined;

app.use(staticFiles("dist"));

app.get("/api/getUsername", (req, res) => {
	console.log(conn);
	return res.send({
		username: userInfo().username
	});
});

app.post("/api/test", verifyToken, (req, res) => {
	jwt.verify(req.token, "secret key", (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.json({
				message: "This is a Test!",
				authData
			});
		}
	});
});

//generates token
app.post("/api/users/login", (req, res) => {
	//mock user, function must be added

	const user = {
		id: 1,
		username: "tim",
		password: "someHash"
	};

	jwt.sign({ user }, "secret key", (err, token) => {
		res.json({ token });
	});
});

//register user
app.post("/api/users/login", (req, res) => {
	//mock user, function must be added

	const user = {
		id: 1,
		username: req.body.username,
		password: bcrypt.hash(req.body.password)
	};

	jwt.sign({ user }, "secret key", (err, token) => {
		res.json({ token });
	});
});

// Token Format
// Authorization: Bearer <acces_token>

//verify token
function verifyToken(req, res, next) {
	//get header value
	const bearerHeader = req.headers["authorization"];
	//check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		//split the space
		const bearer = bearerHeader.split(" ");
		//get token from array
		const bearerToken = bearer[1];
		//set the token
		req.token = bearerToken;
		//next middleware
		next();
	} else {
		//forbidden
		res.sendStatus(403);
	}
}
//endpoints:

// router.post("/users/login", async (req, res) => {
// 	//Login a registered user
// 	try {
// 		const { name, password } = req.body;
// 		const user = await User.findByCredentials(name, password);
// 		if (!user) {
// 			return res
// 				.status(401)
// 				.send({ error: "Login failed! Check authentication credentials" });
// 		}
// 		const token = await user.generateAuthToken();
// 		res.send({ user, token });
// 	} catch (error) {
// 		res.status(400).send(error);
// 	}
// });

// router.post("/users", async (req, res) => {
// 	// Create a new user
// 	try {
// 		const user = new User(req.body);
// 		await user.save();
// 		const token = await user.generateAuthToken();
// 		res.status(201).send({ user, token });
// 	} catch (error) {
// 		res.status(400).send(error);
// 	}
// });

app.listen(3001, () =>
	console.log("Listening on port 3000, API on port 3001!")
);
