import express from "express";

// Controllers
import {
  registerTenantRJ2,
  getAllTenants,
  getSingleTenant,
  registerTenantRJ3,
  registerEnsoTenants,
  getAllEnsoTenants,
} from "../controllers/TenantUserController.js";

const router = express.Router();

router.route("/").get(getAllTenants);
router.route("/tenant/:randomID").get(getSingleTenant).post(registerTenantRJ2);
router.route("/stripe/:randomID").post(registerTenantRJ3);
router.route("/enso").get(getAllEnsoTenants).post(registerEnsoTenants);
export default router;
