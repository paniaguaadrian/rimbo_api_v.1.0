import express from "express";

// Controllers
import {
  registerProperty,
  getAllProperties,
} from "../controllers/PropertyController.js";

const router = express.Router();

router.route("/").post(registerProperty).get(getAllProperties);
export default router;
