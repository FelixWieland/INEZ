import express, { static as staticFiles } from "express";
import path from "path";
import cors from "cors";
import { onConnection } from "./routes/autosuggestSocket";
import socketio from "socket.io";
import bodyParser from "body-parser";
import * as routes from "./routes/test";
import * as userRoutes from "./routes/user";

const PORT = process.env.NODE_ENV === "production" ? 8000 : 3001;

const app = express();
//bodyparser makes urlencoded and json easily readible
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(staticFiles("dist"));
app.options("*", cors());

app.get("/api/getUsername", routes.getUsername);

app.post("/api/user/register", userRoutes.register);
app.post("/api/user/login", userRoutes.login);

app.all("/api/demoCall", routes.demoCall);

// rewrites non matching routes to index.html

if (PORT === 8000)
	app.all("/*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "../../dist/index.html"))
	);

const server = app.listen(PORT, () => console.log("Listening on port " + PORT));
const io = socketio.listen(server);

io.on("connection", onConnection);

// logger
// app.use(morgan("dev"));
