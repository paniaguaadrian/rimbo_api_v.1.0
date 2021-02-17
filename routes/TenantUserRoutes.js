import express from "express";

// Controllers
import {
  registerTenant,
  getAllTenants,
} from "../controllers/TenantUserController.js";

const router = express.Router();

router.route("/").post(registerTenant).get(getAllTenants);
export default router;
