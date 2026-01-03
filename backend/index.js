import express from "express";
import connectToDB from "./db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/Auth.js";
import adminRouter from "./routes/Admin.js";
import checkRouter from "./routes/Check.js";
import cartRouter from "./routes/Cart.js";
import couponRouter from "./routes/Coupon.js";

import "dotenv/config"

const app = express();
app.use(
  cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

await connectToDB(); 

app.use("/user", authRouter);


app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/check", checkRouter);
app.use("/uploads", express.static("uploads"));
app.use("/cart", cartRouter);
app.use("/coupon", couponRouter);


app.listen(3000, () => console.log("Server started at port 3000"));
