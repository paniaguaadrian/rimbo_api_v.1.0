// Model
import Agent from "../models/AgentUserModel.js";

// * @route     POST /api/agents
const registerAgent = async (req, res) => {
  const {
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
  } = req.body;

  const agent = await Agent.create({
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
  });

  if (agent) {
    res.status(201).json({
      _id: agent._id,
      agencyName: agent.agencyName,
      agencyEmailPerson: agent.agencyEmailPerson,
      agencyContactPerson: agent.agencyContactPerson,
      agencyPhonePerson: agent.agencyPhonePerson,
    });
  }
};

// * @route     GET /api/agents
const getAllAgents = async (req, res) => {
  try {
    const Agents = await Agent.find();
    res.json(Agents);
  } catch (error) {
    console.log(error);
  }
};

export { registerAgent, getAllAgents };
