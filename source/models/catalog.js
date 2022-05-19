import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    products: [
      {type: String}
    ]
  },
  {
    timestamps: true
  }
)

const catalog = mongoose.model("Catalog", CatalogSchema);

export default catalog;