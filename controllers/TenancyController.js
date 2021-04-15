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

// ? Regular Flow
// * @desc      Route for RJ1 form to create a new Tenancy
// ! @route     POST /api/tenancies
const registerTenancy = async (req, res) => {
  const {
    // tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    propertyManagerName,
    randomID,

    // tenantTwo
    tenantsNameTwo,
    tenantsEmailTwo,
    tenantsPhoneTwo,
    randomIDTwo,

    // tenantThree
    tenantsNameThree,
    tenantsEmailThree,
    tenantsPhoneThree,
    randomIDThree,

    // tenantFour
    tenantsNameFour,
    tenantsEmailFour,
    tenantsPhoneFour,
    randomIDFour,

    // agency agent
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
    isAgentAccepted,

    // property apartment
    fullRentalAddress,
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
    ownerType,

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
  });

  let tenantTwo = "";
  if (tenantsNameTwo != "" && tenantsEmailTwo != "" && tenantsPhoneTwo != "") {
    tenantTwo = await Tenant.create({
      tenantsName: tenantsNameTwo,
      tenantsEmail: tenantsEmailTwo,
      tenantsPhone: tenantsPhoneTwo,
      propertyManagerName,
      randomID: randomIDTwo,
    });
  }

  let tenantThree = "";
  if (
    tenantsNameThree != "" &&
    tenantsEmailThree != "" &&
    tenantsPhoneThree != ""
  ) {
    tenantThree = await Tenant.create({
      tenantsName: tenantsNameThree,
      tenantsEmail: tenantsEmailThree,
      tenantsPhone: tenantsPhoneThree,
      propertyManagerName,
      randomID: randomIDThree,
    });
  }

  let tenantFour = "";
  if (
    tenantsNameFour != "" &&
    tenantsEmailFour != "" &&
    tenantsPhoneFour != ""
  ) {
    tenantFour = await Tenant.create({
      tenantsName: tenantsNameFour,
      tenantsEmail: tenantsEmailFour,
      tenantsPhone: tenantsPhoneFour,
      propertyManagerName,
      randomID: randomIDFour,
    });
  }

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
    fullRentalAddress,
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
    ownerType,
  });

  // Create Tenancy
  const tenancyData = {
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
  };

  const tenancyDataTwo = {
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
    tenantTwo: tenantTwo._id,
    pm: pm._id,
  };

  const tenancyDataThree = {
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
    tenantTwo: tenantTwo._id,
    tenantThree: tenantThree._id,
    pm: pm._id,
  };

  const tenancyDataFour = {
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
    tenantTwo: tenantTwo._id,
    tenantThree: tenantThree._id,
    tenantFour: tenantFour._id,
    pm: pm._id,
  };

  let tenancy;
  if (tenantTwo === "" && tenantThree === "") {
    console.log("Executing if");
    tenancy = await Tenancy.create(tenancyData);
  } else if (tenantTwo != "" && tenantThree === "") {
    console.log("Executing first else if");
    tenancy = await Tenancy.create(tenancyDataTwo);
  } else if (tenantThree != "" && tenantTwo != "" && tenantFour === "") {
    console.log("Executing second else if");
    tenancy = await Tenancy.create(tenancyDataThree);
  } else if (tenantFour != "" && tenantThree != "" && tenantTwo != "") {
    console.log("Executing third else if");
    tenancy = await Tenancy.create(tenancyDataFour);
  }

  res.json(tenancy);
};

// ? Regular Flow
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

// ? Regular Flow
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

// ? Regular Flow
// * @desc      Route to accept a tenancy by rimbo after RJ18 email
// ! @route     POST /api/tenancies/tenancy/:tenancyID/rimbo/start-service
const acceptTenancyRimbo = async (req, res) => {
  const { tenancyID, rentStart } = req.body;

  let tenancy = await Tenancy.findOneAndUpdate({ tenancyID }, { rentStart });
  res.status(200).json(tenancy);
};

// ? Badi Flow
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
    fullRentalAddress,
    rentalAddressSecond,

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
    fullRentalAddress,
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
    ownerType,
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

// ? Badi Flow
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

// ? StarCity Flow
// * @desc      Route to create a new Tenancy without files attached
// ! @route     POST /api/tenancies/starcity
const registerStarcityTenancy = async (req, res) => {
  const {
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    propertyManagerName,
    randomID,

    // Agency
    agencyName,
    isAgentAccepted,

    // Property
    building,
    room,

    // Tenancy
    rentAmount,
    acceptanceCriteria,
    rentStartDate,
    rentEndDate,
    tenancyID,
  } = req.body;

  // Create Tenant
  const tenant = await Tenant.create({
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    propertyManagerName,
    randomID,
  });

  // Create Agency
  let agent = await Agent.find({ agencyName });
  if (agent.length === 0) {
    agent = await Agent.create({
      agencyName,
      isAgentAccepted,
    });
  } else {
    agent = agent[0];
  }

  // const agent = await Agent.create({
  //   agencyName,
  //   isAgentAccepted,
  // });

  // Create Property
  const property = await Property.create({
    building,
    room,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
    rentAmount,
    acceptanceCriteria,
    rentStartDate,
    rentEndDate,
    tenancyID,

    agent: agent._id,
    property: property._id,
    tenant: tenant._id,
  });
  res.json(tenancy);
};

// ? Habitat Flow
// * @desc      Route to create a new Tenancy without files attached
// ! @route     POST /api/tenancies/habitat
const registerHabitatTenancy = async (req, res) => {
  const {
    // Tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    propertyManagerName,
    randomID,

    // Agency
    agencyName,
    isAgentAccepted,

    // Property
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,

    // Tenancy
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
  } = req.body;

  // Create Tenant
  const tenant = await Tenant.create({
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    propertyManagerName,
    randomID,
  });

  // Create Agency
  let agent = await Agent.find({ agencyName });
  if (agent.length === 0) {
    agent = await Agent.create({
      agencyName,
      isAgentAccepted,
    });
  } else {
    agent = agent[0];
  }

  // const agent = await Agent.create({
  //   agencyName,
  //   isAgentAccepted,
  // });

  // Create Property
  const property = await Property.create({
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
    product,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,

    agent: agent._id,
    property: property._id,
    tenant: tenant._id,
  });
  res.json(tenancy);
};

export {
  // Regular
  registerTenancy,
  getAllTenancies,
  getSingleTenancy,
  updateSingleTenancy,
  acceptTenancyRimbo,
  // Badi
  registerBadiTenancy,
  updateBadiSingleTenancy,
  // StarCity
  registerStarcityTenancy,
  // Habitat
  registerHabitatTenancy,
};
