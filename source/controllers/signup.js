import userModel from "../models/users.js";

const signupController = async (req, res) => {
  try {
    const user = await userModel.findOne({ userName: req.body.userName });
    if (user) {
      res.status(409).json({ error: "User already exists" });
    } else {
      const newUser = await new userModel({
        userName: req.body.userName,
        role: req.body.role,
        password: req.body.password,
      });

      await newUser.save((err) => {
        if (err) {
          res.status(500).json({
            error: err,
            message: "There was an error trying to save user",
          });
          return;
        }
        return res.status(200).json({
          data: newUser,
          message: "User saved successfully",
        });
      });
    }   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default signupController;
