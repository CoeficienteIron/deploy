import express from "express";

import jwt from "jsonwebtoken";

import {
	appDashboard,
	appListTrains,
	appRecords,
	appRunning,
	appSaveTrains,
	appTrains,
} from "../controllers/strengthTraining.js";

function auth(req, res, next) {
	const authHeader = req.header("Authorization");

	try {
		const verified = jwt.verify(authHeader, "secret");
		res.locals.email = verified.email;
		next();
	} catch {
		res.status(401);
	}
}

const app = express();

app.post("/app/records", auth, appRecords);
app.post("/app/trains/", auth, appTrains);
app.post("/app/save/trains", auth, appSaveTrains);
app.get("/app/list/trains", auth, appListTrains);
app.get("/app/dashboard", auth, appDashboard);
app.get("/app/running", appRunning);

export default app;
