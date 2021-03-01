import express from "express";

// Controllers
import { getSingleTenant } from "../controllers/TenantUserController.js";

const router = express.Router();

router.route("/").get(getSingleTenant);
export default router;
