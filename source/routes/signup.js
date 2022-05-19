import express from "express";
const signupRoute = express.Router();

import signupController from "../controllers/signup.js";

signupRoute.post("/register", signupController);

export default signupRoute;
