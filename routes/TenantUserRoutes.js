import express from "express";

// Controllers
import {
  registerTenantRJ2,
  acceptTenantRimbo,
  getAllTenants,
  getSingleTenant,
  registerTenantRJ3,
  registerEnsoTenants,
  getAllEnsoTenants,
  acceptTenantPM,
} from "../controllers/TenantUserController.js";

const router = express.Router();

// General / Forms
router.route("/").get(getAllTenants);
router.route("/tenant/:randomID").get(getSingleTenant).post(registerTenantRJ2);
router.route("/tenant/:randomID/approved").post(acceptTenantRimbo);
router.route("/tenant/:randomID/pm/approved").post(acceptTenantPM);

// Enso Product
router.route("/stripe/:randomID").post(registerTenantRJ3);
router.route("/enso").get(getAllEnsoTenants).post(registerEnsoTenants);
export default router;
