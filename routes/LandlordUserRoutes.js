import express from "express";

// Controllers
import {
  registerLandlord,
  getAllLandlords,
} from "../controllers/LandlordUserController.js";

const router = express.Router();

router.route("/").post(registerLandlord).get(getAllLandlords);
export default router;
