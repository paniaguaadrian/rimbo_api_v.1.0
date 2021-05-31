import express from "express";

// Controllers
import {
  registerAgent,
  getAllAgents,
  getOneAgent,
  getOneAgentByEmail,
  acceptAgentRimbo,
  // Sign up and Sign in for Agent Dashboard
  signin,
  signup,
} from "../controllers/AgentUserController.js";

const router = express.Router();

router.route("/").post(registerAgent).get(getAllAgents);

router.route("/agent/:_id").get(getOneAgent);
router.route("/agent").get(getOneAgentByEmail);
router.route("/agent/approved").post(acceptAgentRimbo);
router.route("/signin").post(signin);
router.route("/signup").post(signup);

export default router;
