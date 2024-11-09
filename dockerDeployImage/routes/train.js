import express from "express";

import {
	trainCharts,
	trainList,
	trainRecord,
	trainRecords,
	trainSave,
	trainSteps,
} from "../controllers/train.js";

const app = express();

import jwt from "jsonwebtoken";

function auth(req, res, next) {
	const authHeader = req.header("Authorization");

	try {
		const verified = jwt.verify(authHeader, "secret");
		res.locals.email = verified.email;
		next();
	} catch {
		res.status(401);
		console.log("Error");
	}
}

app.post("/train/save", trainSave);
app.post("/train/list", trainList);
app.post("/train/record", auth, trainRecord);
app.post("/train/records", auth, trainRecords);
app.get("/train/chart", trainCharts);
app.post("/train/steps", auth, trainSteps);

export default app;
