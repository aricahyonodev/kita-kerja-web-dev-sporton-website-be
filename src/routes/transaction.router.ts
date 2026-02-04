import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createTransaction, getTransactions, getTransactionById, updateTransaction
} from "../controllers/transaction.controller";

const router = Router();

router.post("/checkout", upload.single("image"), createTransaction);
router.get("/", authenticate, getTransactions);
router.get("/:id", authenticate, getTransactionById);
router.patch("/:id", authenticate, updateTransaction);

export default router;
