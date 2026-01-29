import { Router } from "express";
import { initiateAdmin, signin } from "../controllers/auth.controller";


const router = Router();

router.post("/signin", signin)
router.post("/register-admin", initiateAdmin)

export default router;