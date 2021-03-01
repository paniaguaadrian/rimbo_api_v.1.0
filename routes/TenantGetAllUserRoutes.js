import express from "express";

// Controllers
import { getAllTenants } from "../controllers/TenantUserController.js";

const router = express.Router();

router.route("/").get(getAllTenants);
export default router;
