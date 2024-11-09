import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import serveStatic from "serve-static";
import 'dotenv/config';
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import connectDB from "./services/connectDB.ts";
import strenghTraining from "./routes/strengthTraining.js";
import train from "./routes/train.js";
import user from "./routes/user.js";
import goalTracker from "./routes/goalTracker.js";
import backoffice from "./routes/backoffice.js";
import weights from "./routes/weight.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const collection = await connectDB();
const app = express();
app.use(
	session({
		secret: "secret-key",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(bodyParser.json());
app.use(cors());
app.use(serveStatic(path.join(__dirname, "appDist")));
app.use("/", strenghTraining);
app.use("/", train);
app.use("/", goalTracker);
app.use("/", user);
app.use("/", backoffice);
app.use("/", weights);
const port = process.env.PORT || 4000;
const frontendRoutes = [
	"/redirect",
	"/train",
	"/trainlist",
	"/trainsummary",
	"/perfil",
	"/records",
	"/ranking",
	"/register",
	"/gettrain",
];
app.route(frontendRoutes).get((_req, res) => {
	res.sendFile(path.join(`${__dirname}/dist/index.html`));
});
const appWebRoutes = ["/app", "/firstonboarding", "/contact"];

app.route(appWebRoutes).get((_req, res) => {
	res.sendFile(path.join(`${__dirname}/appDist/index.html`));
});


app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log("Escuchando en puerto:", port);
});
export default collection;
export { app }
