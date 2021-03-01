// Models
import Tenant from "../models/TenantUserModel.js";
import Agent from "../models/AgentUserModel.js";
import Landlord from "../models/LandlordUserModel.js";
import Property from "../models/PropertyModel.js";
import Tenancy from "../models/TenancyModel.js";
import PM from "../models/PMUserModel.js";

// * @desc      Route for RJ1 form to create a new Tenancy
// ! @route     POST /api/tenancies
const registerTenancy = async (req, res) => {
  const {
    // tenant from Rj1
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    propertyManagerName,
    randomID,
    tenantRimboService,

    // agency agent
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
    isAgentAccepted,

    // property apartment
    rimboService,
    rentalDuration,
    rentalCity,
    rentalPostalCode,
    monthlyRent,
    ownerType,
    rentalAddress,

    // Tenancy
    rentAmount,
    rentDuration,
    RentStartDate,
    RentEndDate,
    product,
    tenancyID,

    // landlord
    landlordName,
    landlordEmail,
    landlordPhone,

    // property manager
    PMName,
    PMEmail,
    PMPhone,
  } = req.body;

  // Create Tenant
  const tenant = await Tenant.create({
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    propertyManagerName,
    randomID,
    tenantRimboService,
  });

  // Create Landlord
  let landlord = await Landlord.find({ landlordEmail });
  if (landlord.length === 0) {
    landlord = await Landlord.create({
      landlordName,
      landlordEmail,
      landlordPhone,
    });
  } else {
    landlord = landlord[0];
  }

  // Create PM
  let pm = await PM.find({ PMName });
  if (pm.length === 0) {
    pm = await PM.create({
      PMName,
      PMEmail,
      PMPhone,
    });
  } else {
    pm = pm[0];
  }

  // Create Agent
  let agent = await Agent.find({ agencyEmailPerson });
  if (agent.length === 0) {
    agent = await Agent.create({
      agencyName,
      agencyEmailPerson,
      agencyContactPerson,
      agencyPhonePerson,
      isAgentAccepted,
    });
  } else {
    agent = agent[0];
  }

  // Create Property
  // Buscarla por ID para que no se repita
  const property = await Property.create({
    rimboService,
    rentalDuration,
    rentalCity,
    rentalPostalCode,
    monthlyRent,
    ownerType,
    rentalAddress,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
    rentAmount,
    rentDuration,
    RentStartDate,
    RentEndDate,
    product,
    tenancyID,

    agent: agent._id,
    property: property._id,
    landlord: landlord._id,
    tenant: tenant._id,
    pm: pm._id,
  });
  res.json(tenancy);
};

// * @desc      Route to get all tenancies on th DB
// ! @route     GET /api/tenancies
const getAllTenancies = async (req, res) => {
  try {
    const allTenancies = await Tenancy.find()
      .populate("landlord")
      .populate("tenant")
      .populate("property")
      .populate("pm")
      .populate("agent");
    res.json(allTenancies);
  } catch (error) {
    console.log(error);
  }
};

// * @desc      Route to get a single Tenancy by tenancyID
// ! @route     GET /api/tenancy/:tenancyID
const getSingleTenancy = async (req, res) => {
  try {
    const tenancyID = req.originalUrl.slice(13);

    const thisTenancy = await Tenancy.findOne({ tenancyID })
      .populate("landlord")
      .populate("tenant")
      .populate("agent")
      .populate("pm")
      .populate("property");
    res.status(200).json(thisTenancy);
  } catch (error) {
    console.log(error);
  }
};

export { registerTenancy, getAllTenancies, getSingleTenancy };
