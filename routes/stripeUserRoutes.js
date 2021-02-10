import express from "express";

// Controllers
import {
  registerTenant,
  getEnsoTenants,
} from "../controllers/stripeUserController.js";

const router = express.Router();

router.route("/").post(registerTenant).get(getEnsoTenants);

export default router;
