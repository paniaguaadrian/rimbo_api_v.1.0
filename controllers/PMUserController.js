import PM from "../models/PMUserModel.js";

// * @route     POST /api/pms
const registerPM = async (req, res) => {
  const { PMName, PMEmail, PMPhone } = req.body;

  const user = await PM.create({
    PMName,
    PMEmail,
    PMPhone,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      PMName: user.PMName,
      PMEmail: user.PMEmail,
      PMPhone: user.PMPhone,
    });
  }
};

// * @route     GET /api/pms
const getAllPMs = async (req, res) => {
  try {
    const PMs = await PM.find();
    res.json(PMs);
  } catch (error) {
    console.log(error);
  }
};

export { registerPM, getAllPMs };
