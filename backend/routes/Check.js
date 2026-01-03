import { Router } from "express";
import { checkForLogin } from "../middlewares/Auth.js";

const checkRouter = Router();

checkRouter.get("/login", checkForLogin);

export default checkRouter;
