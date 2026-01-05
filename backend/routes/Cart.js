import { Router } from "express";
import {
  addToCart,
  getCart,
  deleteCartItem,
  updateCartQuantity,
} from "../controllers/Cart.js";
import { checkAuth } from "../middlewares/Auth.js";

const cartRouter = Router();

cartRouter.post("/", checkAuth, addToCart);
cartRouter.get("/", checkAuth, getCart);
cartRouter.delete("/:productId", checkAuth, deleteCartItem);
cartRouter.patch("/update/:productId", checkAuth, updateCartQuantity);

export default cartRouter;


