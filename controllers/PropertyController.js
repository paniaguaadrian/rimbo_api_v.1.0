import Property from "../models/PropertyModel.js";

// * @route     POST /api/properties
const registerProperty = async (req, res) => {
  const {
    rimboService,
    rentalDuration,
    rentalCity,
    rentalPostalCode,
    monthlyRent,
    ownerType,
    rentalAddress,
  } = req.body;

  const property = await Property.create({
    rimboService,
    rentalDuration,
    rentalCity,
    rentalPostalCode,
    monthlyRent,
    ownerType,
    rentalAddress,
  });

  if (property) {
    res.status(201).json({
      _id: property._id,
      rimboService: property.rimboService,
      rentalDuration: property.rentalDuration,
      rentalCity: property.rentalCity,
      rentalPostalCode: property.rentalPostalCode,
      monthlyRent: property.monthlyRent,
      ownerType: property.ownerType,
      rentalAddress: property.rentalAddress,
    });
  }
};

// * @route     GET /api/properties
const getAllProperties = async (req, res) => {
  try {
    const Properties = await Property.find();
    res.json(Properties);
  } catch (error) {
    console.log(error);
  }
};

export { registerProperty, getAllProperties };
