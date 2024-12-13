import express from "express";
import { messages } from "../controllers/backoffice.js";

const app = express();

app.get("/messages", messages);

export default app;
