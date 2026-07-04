import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwtToken = `${process.env.JWT_SECRET}`;
const jwtExpires = `${process.env.JWT_EXPIRES_IN}`;

export const generateToken = (user, res) => {
  const token = jwt.sign({ id: user.id, email: user.email }, jwtToken, {
    expiresIn: jwtExpires,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  console.log("Cookie was generated");
  return token;
};
