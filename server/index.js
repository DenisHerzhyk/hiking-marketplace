import express from "express";
import cors from "cors";
import { config } from "dotenv";
import indexRouter from "./routes/indexRoutes.js";
import dbRouter from "./routes/dbRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import cookiesRouter from "./routes/cookieRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import checkoutRouter from "./routes/checkoutRoutes.js";
import ordersRouter from "./routes/ordersRoutes.js";
import deliveryRouter from "./routes/deliveryRoutes.js";
import aiRouter from "./routes/aiRouters.js";
import { connectDB, disconnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
config();

const app = express();
const PORT = process.env.PORT || 4996;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(cookieParser());

//routes
app.use("/api", indexRouter);
app.use("/api/db", dbRouter);
app.use("/api/user", authRouter);
app.use("/api/cookies", cookiesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products", productsRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/delivery", deliveryRouter);
//ai
app.use("/api/ai", aiRouter);
//server listening
let server;
const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

await startServer();

//handle issues on server
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection: ", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.log("Uncaught Exception: ", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
