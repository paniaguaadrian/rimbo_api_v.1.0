import express from "express";

// Controllers
import {
  registerTenancy,
  getAllTenancies,
} from "../controllers/TenancyController.js";

const router = express.Router();

router.route("/").post(registerTenancy).get(getAllTenancies);
export default router;
