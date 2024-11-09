import express from "express";
import { messages, activityUsers } from "../controllers/backoffice.js";

const app = express();

app.get("/backoffice", activityUsers);
app.get("/messages", messages);

export default app;
