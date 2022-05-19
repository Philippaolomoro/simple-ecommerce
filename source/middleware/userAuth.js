import jwt from "jsonwebtoken";

const  authorizeUser = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const accessToken = bearerToken && bearerToken.split(" ")[1];
  if (!accessToken) {
    return res.status(403).json({
      message: "No token provided",
    });
  }
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        res.status(401).json({
          error: err.message,
          message: "Unauthorized access",
        });
      }
      req.decoded = decoded;
      next();
    }
  );
};

export default authorizeUser;