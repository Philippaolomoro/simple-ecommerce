import express from "express";
const catalogRoute = express.Router();

import catalogController from "../controllers/catalog.js";
import checkRole from "../middleware/roleAuth.js";
import authorizeUser from "../middleware/userAuth.js";

catalogRoute.post(
  "/seller/create-catalog", 
  authorizeUser, 
  checkRole(["seller"]), 
  catalogController.createCatalog
);

catalogRoute.get(
  "/buyer/seller-catalog/:seller_id",
  authorizeUser,
  checkRole(["buyer"]),
  catalogController.getCatalogOfSeller
);



export default catalogRoute;