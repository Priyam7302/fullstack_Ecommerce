import express from "express";
import connectToDB from "./db/connect.js";
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/Auth.js";
import cors from "cors";
import adminRouter from "./routes/Admin.js";
 // import router from "./routes/router.js";

const app = express();
app.use(express.json());
await connectToDB();


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);


app.use("/product", productRouter);
app.use("/user", authRouter);
app.use("/admin", adminRouter); 


app.listen(3000, () => console.log("Server started at port 3000"));
