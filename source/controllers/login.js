import userModel from "../models/users.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";

const loginController = async (req, res) => {
  try {
    const {userName, password} = req.body;
    const user = await userModel.findOne({userName})
    if(!user){
      res.status(404).json({
        error: "User not found. Invalid login credentials"
      })
    } else {
      const compare = await user.comparePassword(password)
      if(!compare){
        res.status(401).json({
          error: "Password is incorrect"
        })
      } else {
        const userObj = {
          id: user._id,
          username: user.userName
        }
        const tokenSecret = process.env.ACCESS_TOKEN_SECRET
        const tokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION

        const accessToken = jwtMiddleware.generateToken(userObj, tokenSecret, tokenExpiration)

        return res.status(200).json({
          data: accessToken,
          message: "User logged in successfully"
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}

export default loginController;