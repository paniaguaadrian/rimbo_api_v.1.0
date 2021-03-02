import express from "express";

// Controllers
import {
  registerTenancy,
  getAllTenancies,
  getSingleTenancy,
} from "../controllers/TenancyController.js";

const router = express.Router();

router.route("/").post(registerTenancy).get(getAllTenancies);
router.route("/tenancy/:tenancyID").get(getSingleTenancy);
export default router;
