import Router from "express";
import { getData, addData, updateData, deleteData } from "../controllers/controller.js";
const router = Router();

router.get("/", getData);
router.post("/", addData);
router.put("/", updateData);
router.delete("/", deleteData);

export default router;
