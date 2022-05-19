import express from "express";
const router = express.Router();

import signupRoute from "../routes/signup.js";
import loginRoute from "../routes/login.js";
import catalogRoute from "../routes/catalog.js"

router.get("/", (req, res) => 
  res.status(200).json({
    error: false,
    message: "Welcome to the e-commerce"
  })
)

router.get("*", (req, res) => 
  res.status(404).json({ 
    error: "not found" 
  })
);

router.use("/signup", signupRoute);
router.use("/auth", loginRoute);
router.use(catalogRoute);

export default router;