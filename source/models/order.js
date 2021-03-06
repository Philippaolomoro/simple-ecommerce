import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    product_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", OrderSchema);

export default orderModel;
