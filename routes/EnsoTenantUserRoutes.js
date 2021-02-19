import express from "express";

// Controllers
import {
  registerEnsoTenant,
  getEnsoTenants,
} from "../controllers/EnsoTenantUserController.js";

const router = express.Router();
router.route("/").post(registerEnsoTenant).get(getEnsoTenants);
export default router;
