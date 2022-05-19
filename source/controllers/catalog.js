import catalog from "../models/catalog.js";

const catalogController = {
  createCatalog: async(req, res) => {
    try {
      const catalog = await catalog.findOne({name: req.body.name});
      if(catalog){
        res.status(409).json({
          message: "A catalog with this name already exists. Please try creating with another name"
        })
      } 
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Internal server error, please try again"
      })
    }
  }
};

export default catalogController;