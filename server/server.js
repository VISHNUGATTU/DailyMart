import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import connectCloudinary from "./configs/cloudinary.js";

// Routes
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import driverRouter from "./routes/driverRoute.js";
import vendorRouter from "./routes/vendorRoute.js";
import workerRouter from "./routes/workerRoute.js";

dotenv.config();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect DB
await connectDB();

const allowedOrigins = ["http://localhost:5173"];

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/workers", workerRouter);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
