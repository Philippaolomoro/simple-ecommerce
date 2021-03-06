import express from "express";
const orderRoute = express.Router();

import orderController from "../controllers/order.js";
import checkRole from "../middleware/roleAuth.js";
import authorizeUser from "../middleware/userAuth.js";

orderRoute.post(
  "/buyer/create-order/:seller_id", 
  authorizeUser, 
  checkRole(["buyer"]), 
  orderController.createAnOrder
);

orderRoute.get(
  "/seller/orders",
  authorizeUser,
  checkRole(["seller"]),
  orderController.getAnOrder
)

export default orderRoute;