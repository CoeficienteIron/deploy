import express from "express";

import { gtTrainRecords, infoForGT } from "../controllers/goalTracker.js";
const app = express();

app.get("/info-for-gt", infoForGT);

app.get("/gt/train/records", gtTrainRecords);

export default app;
