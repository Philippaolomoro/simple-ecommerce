import express from "express";
const loginRoute = express.Router();

import loginController from "../controllers/login.js";

loginRoute.post("/login", loginController);

export default loginRoute;