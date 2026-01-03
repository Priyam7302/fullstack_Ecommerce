// import { Router } from "express";
// import { loginAdmin, logoutAdmin, updateAdmin } from "../controllers/Admin.js";

// const adminRouter = Router();

// adminRouter.post("/login", loginAdmin);
// adminRouter.post("/logout", logoutAdmin);
// adminRouter.put("/:id", updateAdmin);

// export default adminRouter;
import { Router } from "express";
import { loginAdmin, logoutAdmin, updateAdmin } from "../controllers/Admin.js";
import { checkRole } from "../middlewares/Auth.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);

// 🔐 ONLY ADMIN CAN LOGOUT ADMIN
adminRouter.post("/logout", checkRole("admin"), logoutAdmin);

// 🔐 ONLY ADMIN CAN UPDATE ADMIN
adminRouter.put("/:id", checkRole("admin"), updateAdmin);

export default adminRouter;
