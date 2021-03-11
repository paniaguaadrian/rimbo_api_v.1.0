import Landlord from "../models/LandlordUserModel.js";

// * @route     POST /api/landlords
const registerLandlord = async (req, res) => {
  const { landlordName, landlordEmail, landlordPhone } = req.body;

  const landlord = await Landlord.create({
    landlordName,
    landlordEmail,
    landlordPhone,
  });

  if (landlord) {
    res.status(201).json({
      _id: landlord._id,
      landlordName: landlord.landlordName,
      landlordEmail: landlord.landlordEmail,
      landlordPhone: landlord.landlordPhone,
    });
  }
};

// * @route     GET /api/landlords
const getAllLandlords = async (req, res) => {
  try {
    const Landlords = await Landlord.find();
    res.json(Landlords);
  } catch (error) {
    console.log(error);
  }
};

export { registerLandlord, getAllLandlords };
