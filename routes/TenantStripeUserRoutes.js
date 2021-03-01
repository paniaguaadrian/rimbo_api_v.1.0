import express from "express";

// Controllers
import { registerTenantRJ3 } from "../controllers/TenantUserController.js";

const router = express.Router();

router.route("/").post(registerTenantRJ3);
export default router;
