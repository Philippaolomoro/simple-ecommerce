import jwt from "jsonwebtoken";

const generateToken = (payload, secret, expiration) => {
  return jwt.sign(payload, secret, { expiresIn: expiration });
};

export default generateToken;