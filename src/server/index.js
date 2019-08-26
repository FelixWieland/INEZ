import express, { static as staticFiles } from "express";
import { userInfo } from "os";
import { connect } from "./config/mongoconf";
import fs from "fs";
import path from "path";
const jwt = require("jsonwebtoken");

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
app.post("/api/login", (req, res) => {
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
