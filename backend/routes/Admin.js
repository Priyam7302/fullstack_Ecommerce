import { Router } from "express";
import { loginAdmin, logoutAdmin, updateAdmin } from "../controllers/Admin.js";
import { checkRole } from "../middlewares/Auth.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);

adminRouter.post("/logout", checkRole("admin"), logoutAdmin);

adminRouter.put("/:id", checkRole("admin"), updateAdmin);

export default adminRouter;
