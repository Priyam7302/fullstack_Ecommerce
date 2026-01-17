// import {Router} from "express";
// import {
//   addProduct,
//   checkSlug,
//   deleteProduct,
//   getProducts,
//   updateProduct,
//   getSingleProduct,
// } from "../controllers/Product.js";
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileName = req.body.slug + "-" + uniqueSuffix + path.extname(file.originalname);
//     cb(null, fileName);
//   },
// });
// const upload = multer({ storage: storage });

// const productRouter = Router();

// productRouter.get("/", getProducts);
// productRouter.get("/:slug", getSingleProduct);
// productRouter.post("/", upload.array("images", 5), addProduct);
// productRouter.put("/:id", updateProduct);
// productRouter.delete("/:id", deleteProduct);
// productRouter.get("/checkSlug/:slug", checkSlug);


// export default productRouter;

import { Router } from "express";
import {
  addProduct,
  checkSlug,
  deleteProduct,
  getProducts,
  updateProduct,
  getSingleProduct,
} from "../controllers/Product.js";
import multer from "multer";

/*
🟢 CHANGE 1:
We REMOVED diskStorage + filename logic
Now Multer only puts file temporarily in "temp/"
*/
const upload = multer({ dest: "temp/" });

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:slug", getSingleProduct);

/*
🟢 CHANGE 2:
Upload still works SAME from frontend
But file goes to temp/ instead of uploads/
*/
productRouter.post("/", upload.array("images", 5), addProduct);

productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/checkSlug/:slug", checkSlug);

export default productRouter;
