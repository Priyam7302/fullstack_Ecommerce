import express from "express";
import {
  getAllCoupons,
  addCoupon,
  applyCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/Coupon.js";

const router = express.Router();

router.get("/all", getAllCoupons);
router.post("/add", addCoupon);
router.post("/apply", applyCoupon);
router.put("/update/:id", updateCoupon);
router.delete("/delete/:id", deleteCoupon);

export default router;
