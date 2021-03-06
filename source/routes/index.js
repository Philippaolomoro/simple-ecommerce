import express from "express";
const router = express.Router();

import signupRoute from "../routes/signup.js";
import loginRoute from "../routes/login.js";
import catalogRoute from "../routes/catalog.js";
import orderRoute from "../routes/order.js";

router.get("/", (req, res) => 
  res.status(200).json({
    error: false,
    message: "Welcome to the e-commerce"
  })
);

router.use("/auth", signupRoute);
router.use("/auth", loginRoute);
router.use(catalogRoute);
router.use(orderRoute);

export default router;