import express from "express";

// Controllers
import { registerTenantRJ2 } from "../controllers/TenantUserController.js";

const router = express.Router();

router.route("/").post(registerTenantRJ2);
export default router;
