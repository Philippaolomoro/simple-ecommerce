import catalogModel from "../models/catalog.js";
import userModel from "../models/users.js";
import productModel from "../models/product.js";

const catalogController = {
  createCatalog: async(req, res) => {
    try {
      const seller = await userModel.findOne({_id: res.user.id});
      if(seller){
        const catalog = await catalogModel.findOne({name: req.body.name})
        if(catalog){
          return res.status(409).json({
            error: "A catalog with that name already exists. Please create a new catalog"
          })
        } else{
          const newCatalog = new catalogModel({
            name: req.body.name,
            product_id: [],
            seller_id: seller._id,
          })

          const mappedProducts = req.body.product_id.map((item)=>{
            const product = new productModel({
              name: item.name,
              price: item.price,
              catalog_id: newCatalog._id
            })

            product.save();
            return (product);
          })

          newCatalog.product_id = mappedProducts;
          newCatalog.save((err)=> {
            if(err){
              return res.status(500).json({
                error: "There was a problem trying while to save the catalog. Please try again"
              })
            }
            return res.status(201).json({
              message: "Catalog created successfully"
            })
          })
        }
      } else {
        return res.status(404).json({
          message: "Seller not found",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Internal server error, please try again"
      })
    }
  },

  getCatalogOfSeller: async(req, res) => {
    try {
      const sellerCatalog = await catalogModel.find({seller_id: req.params.seller_id}).populate("product_id").lean()

      return res.status(200).json({
        sellerCatalog,
        message: "All catalog of this seller gotten successfully"
      })
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Internal server error, please try again",
      });
    }
  }
};

export default catalogController;