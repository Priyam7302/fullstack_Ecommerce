import { Router } from "express";
import { checkAuth } from "../middlewares/Auth.js";
import {
  addToCart,
  getCart,
  deleteCartItem,
  updateCartQuantity,
} from "../controllers/Cart.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);
cartRouter.post("/add", checkAuth, addToCart);
cartRouter.delete("/delete/:id", checkAuth, deleteCartItem);
cartRouter.patch("/update/:id", checkAuth, updateCartQuantity); 

export default cartRouter;
