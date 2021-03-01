import express from "express";

// Controllers
import { getSingleTenancy } from "../controllers/TenancyController.js";

const router = express.Router();

router.route("/").get(getSingleTenancy);
export default router;
