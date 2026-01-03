import { Router } from "express";
import {
  loginUser,
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
  logoutUser,
} from "../controllers/Auth.js";
import { googleLogin } from "../controllers/googleLogin.js";
import { checkAuth, checkRole } from "../middlewares/Auth.js";
import { toggleBlockUser } from "../controllers/Auth.js";

const authRouter = Router();

/* ---------- PUBLIC ROUTES ---------- */
authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/google-login", googleLogin);

/* ---------- PROTECTED USER ROUTES ---------- */
authRouter.post("/logout", checkAuth, logoutUser);

/* ---------- ADMIN-ONLY ROUTES ---------- */
authRouter.get("/", checkRole("admin"), getUsers);
authRouter.delete("/:id", checkRole("admin"), deleteUser);

/* ---------- USER UPDATE ---------- */
authRouter.put("/:id", checkAuth, updateUser);

authRouter.patch("/block/:id", checkRole("admin"), toggleBlockUser);

export default authRouter;
