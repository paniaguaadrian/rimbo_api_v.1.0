// Model
import Agent from "../models/AgentUserModel.js";

// Packages for signup / signin
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

// * @desc      Route to sign in an agent
// ! @route     post /api/agents/signin
const signin = async (req, res) => {
  const { agencyEmailPerson, agencyPersonPassword } = req.body;

  try {
    const existingAgent = await Agent.findOne({ agencyEmailPerson });
    if (!existingAgent)
      return res.status(404).json({ message: "Agent doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      agencyPersonPassword,
      existingAgent.agencyPersonPassword
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        agencyEmailPerson: existingAgent.agencyEmailPerson,
        id: existingAgent._id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingAgent, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// * @desc      Route to sign up an agent
// ! @route     post /api/agents/signup
const signup = async (req, res) => {
  const {
    agencyEmailPerson,
    agencyPersonPassword,
    confirmPassword,
    firstName,
    lastName,
  } = req.body;

  try {
    const existingAgent = await Agent.findOne({ agencyEmailPerson });
    if (existingAgent)
      return res.status(400).json({ message: "Agent already exist." });

    if (agencyPersonPassword !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(agencyPersonPassword, 12);

    const result = await Agent.create({
      agencyEmailPerson,
      agencyPersonPassword: hashedPassword,
      agencyContactPerson: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { agencyEmailPerson: result.agencyEmailPerson, id: result._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { registerAgent, getAllAgents, signin, signup };
