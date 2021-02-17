import express from "express";

// Controllers
import { registerPM, getAllPMs } from "../controllers/PMUserController.js";

const router = express.Router();

router.route("/").post(registerPM).get(getAllPMs);
export default router;
