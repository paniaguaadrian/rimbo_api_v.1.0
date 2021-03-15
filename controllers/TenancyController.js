import Tenant from "../models/TenantUserModel.js";
import Agent from "../models/AgentUserModel.js";
import Landlord from "../models/LandlordUserModel.js";
import Property from "../models/PropertyModel.js";
import Tenancy from "../models/TenancyModel.js";
import PM from "../models/PMUserModel.js";

// * @desc      Route to get all tenancies on the DB
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

// * @desc      Route for RJ1 form to create a new Tenancy
// ! @route     POST /api/tenancies
const registerTenancy = async (req, res) => {
  const {
    // tenant from Rj1
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    randomID,

    // agency agent
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
    isAgentAccepted,

    // property apartment
    rentalCity,
    rentalPostalCode,
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
    randomID,
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
    rentalCity,
    rentalPostalCode,
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

// * @desc      Route for RJ1 form to create a new Tenancy FOR BADI
// ! @route     POST /api/tenancies/badi
const registerBadiTenancy = async (req, res) => {
  const {
    // tenant from Rj1
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    randomID,

    // agency agent
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
    isAgentAccepted,

    // property apartment
    rentalCity,
    rentalPostalCode,
    ownerType,
    rentalAddress,

    // Tenancy
    rentAmount,
    rentDuration,
    RentStartDate,
    RentEndDate,
    product,
    tenancyID,

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
    randomID,
  });

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
    rentalCity,
    rentalPostalCode,
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
    tenant: tenant._id,
    pm: pm._id,
  });
  res.json(tenancy);
};

// * @desc      Route to update a single Tenancy by tenancyID for RJS (Badi Flow)
// ! @route     POST /api/tenancies/tenancy/badi/:tenancyID
const updateBadiSingleTenancy = async (req, res) => {
  const { landlordName, landlordEmail, landlordPhone, tenancyID } = req.body;

  // Create Landlord
  let landlord = await Landlord.find({ landlordEmail });
  if (landlord.length === 0) {
    landlord = await Landlord.create({
      landlordName,
      landlordEmail,
      landlordPhone,
      tenancyID,
    });
  } else {
    landlord = landlord[0];
  }

  // Create Tenancy
  const tenancy = await Tenancy.findOneAndUpdate(
    { tenancyID },
    {
      landlord: landlord._id,
    }
  );

  res.json(tenancy);
};

// * @desc      Route to get a single Tenancy by tenancyID for RJ2
// ! @route     GET /api/tenancies/tenancy/:tenancyID
const getSingleTenancy = async (req, res) => {
  try {
    const tenancyID = req.originalUrl.slice(23);

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

// * @desc      Route to upddate a single Tenancy by tenancyID for RJS (Regular Flow)
// ! @route     POST /api/tenancies/tenancy/:tenancyID
const updateSingleTenancy = async (req, res) => {
  let { date, tenancyID } = req.body;

  const pmAnex = req.files[0];
  const pmAnexUrl = pmAnex.linkUrl;
  let thisTenancy = await Tenancy.findOneAndUpdate(
    { tenancyID },
    { rentStartDate: date, pmAnex: pmAnexUrl }
  )
    .populate("landlord")
    .populate("tenant")
    .populate("agent")
    .populate("pm")
    .populate("property");

  res.status(201).json(thisTenancy);
};

// * @desc      Route to accept a tenancy by rimbo after RJ18 email
// ! @route     POST /api/tenancies/tenancy/:tenancyID/rimbo/start-service
const acceptTenancyRimbo = async (req, res) => {
  const { tenancyID, rentStart } = req.body;

  let tenancy = await Tenancy.findOneAndUpdate({ tenancyID }, { rentStart });
  res.status(200).json(tenancy);
};

export {
  registerTenancy,
  getAllTenancies,
  getSingleTenancy,
  updateSingleTenancy,
  acceptTenancyRimbo,
  registerBadiTenancy,
  updateBadiSingleTenancy,
};
