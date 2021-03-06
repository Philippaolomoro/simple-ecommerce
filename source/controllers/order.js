import orderModel from "../models/order.js";
import catalogModel from "../models/catalog.js";
import userModel from "../models/users.js";

const orderController = {
  createAnOrder: async (req, res) => {
    const buyer = res.user.id
    try {
      const seller = await userModel.findById({ _id: req.params.seller_id });
      if (seller && seller.role === "seller") {
        const sellerCatalog = await catalogModel.findOne({
          seller_id: req.params.seller_id,
        });
        if (sellerCatalog) {
          const newOrder = new orderModel({
            product_id: req.body.product_id,
            buyer_id: buyer,
            seller_id: req.params.seller_id,
          })

          newOrder.save(err => {
            if (err) {
              return res.status(500).json({
                error:
                  "There was a problem trying to create a order. Please try again",
              });
            }
            return res.status(201).json({
              message: "A new order has been successfully placed",
            });
          })
        } else {
          return res.status(404).json({
            error: "This seller does not have a catalog",
          });
        }
      } else {
        return res.status(404).json({
          error: "This seller doesn't exist",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Internal server error, please try again",
      });
    }
  },

  getAnOrder: async (req, res) => {
    try {
      const sellerOrders = await orderModel.find({seller_id: res.user.id}).lean()
      return res.status(200).json({
        data: sellerOrders,
        message: "All your orders retrieved successfully"
      })
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Internal server error, please try again",
      });
    }
  },
};

export default orderController;
