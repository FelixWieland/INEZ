import { connect } from "./config/mongoconf";
import fs from "fs";
import path from "path";
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

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

//logger
app.use(morgan("dev"));

//import routes
const listRoutes = require("./api/routes/lists");
const userRoutes = require("./api/routes/user");

//bodyparser makes urlencoded and json easily readible
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//allows web applications to access
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		return res.status(200).json({});
	}
	next();
});

//use setts up middleware
//routes to the folder /api/routes/products
//therefore the called api only has one /
app.use("/lists", listRoutes);
app.use("/user", userRoutes);

//default case if no file is found
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

//for other errors for example server errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
