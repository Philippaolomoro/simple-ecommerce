import mongoose from "mongoose";
import userModel from "./users.js";

const CatalogSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    product_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }],
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true
  }
)

const catalogModel = mongoose.model("Catalog", CatalogSchema);

export default catalogModel;