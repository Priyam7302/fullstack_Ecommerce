import { Router } from "express";
import { checkAuth } from "../middlewares/Auth.js";
import { addToCart ,getCart} from "../controllers/Cart.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);
cartRouter.post("/add", checkAuth, addToCart);
// cartRouter.delete("/delete",)


export default cartRouter;
