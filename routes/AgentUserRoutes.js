import express from "express";

// Controllers
import {
  registerAgent,
  getAllAgents,
} from "../controllers/AgentUserController.js";

const router = express.Router();

router.route("/").post(registerAgent).get(getAllAgents);
export default router;
