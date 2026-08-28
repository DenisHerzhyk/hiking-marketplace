import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { prisma } from "../config/db.js";

config();

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Cookie was not received from the user" });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Role is read from the database rather than the token so that a revoked
// admin loses access immediately and a stale token cannot carry the claim.
export const requireAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, emailVerified: true },
    });

    if (!user || !user.emailVerified || user.role !== "admin") {
      return res.status(403).json({ message: "Administrator access required" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Authorization check failed" });
  }
};
