import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";


const router = Router();

router.post("/", authenticate, upload.single("image"), createProduct)
router.get("/", getProduct)
router.get("/:id", getProductById)
router.put("/:id", authenticate, upload.single("image"), updateProduct)
router.delete("/:id", authenticate, deleteProduct)

export default router;