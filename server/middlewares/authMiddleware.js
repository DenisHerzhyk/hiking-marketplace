import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    console.log("verify: We did not receive a cookie 'jwt'");
    return res
      .status(401)
      .json({ message: "Cookie was not received from the user" });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = decoded;
    console.log("verify: cookie was received: ", token);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyLogin = (req, res, next) => {
  const token = req.cookies.jwt;
};
