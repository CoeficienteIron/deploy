import express from "express";

import { getWeights, trainWeight, weights } from "../controllers/weight.js";

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

app.post("/train/weight", auth, trainWeight);
app.post("/train/getWeights", getWeights);
app.get("/front/weights", weights);

export default app;
