import express from "express";

const app = express();

import {
	appContact,
	appLogin,
	appSignup,
	// userRegister,
	usersList,
	// usersLogin,
} from "../controllers/user.js";

app.post("/app/login", appLogin);
app.post("/app/signup", appSignup);
// app.post("/users/login", usersLogin);
// app.post("/users/register", userRegister);
app.get("/users/list", usersList);
app.post("/app/contact", appContact);

export default app;
