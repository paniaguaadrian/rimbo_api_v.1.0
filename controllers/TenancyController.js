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
      .populate("tenantTwo")
      .populate("tenantThree")
      .populate("tenantFour")
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
    stageOne,

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
    agencyLanguage,

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
    tenancyID,
    stageOne,
  });

  let tenantTwo = "";
  if (tenantsNameTwo != "" && tenantsEmailTwo != "" && tenantsPhoneTwo != "") {
    tenantTwo = await Tenant.create({
      tenantsName: tenantsNameTwo,
      tenantsEmail: tenantsEmailTwo,
      tenantsPhone: tenantsPhoneTwo,
      propertyManagerName,
      randomID: randomIDTwo,
      tenancyID,
      stageOne,
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
      tenancyID,
      stageOne,
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
      tenancyID,
      stageOne,
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
      agencyLanguage,
    });
  } else {
    agent = agent[0];
  }

  // Create Property
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
    tenancy = await Tenancy.create(tenancyData);
  } else if (tenantTwo != "" && tenantThree === "") {
    tenancy = await Tenancy.create(tenancyDataTwo);
  } else if (tenantThree != "" && tenantTwo != "" && tenantFour === "") {
    tenancy = await Tenancy.create(tenancyDataThree);
  } else if (tenantFour != "" && tenantThree != "" && tenantTwo != "") {
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
      .populate("tenantTwo")
      .populate("tenantThree")
      .populate("tenantFour")
      .populate("agent")
      .populate("pm")
      .populate("property");
    res.status(200).json(thisTenancy);
  } catch (error) {
    console.log(error);
  }
};

// ? Regular Flow
// * @desc      Route to accept all tenants in a tenancy by Rimbo after RJ2
// ! @route     POST /api/tenancies/tenancy/:tenancyID/allTenantsAccepted
const acceptAllTenantsRimbo = async (req, res) => {
  const { tenancyID, isAllTenantsAccepted } = req.body;

  let tenancy = await Tenancy.findOneAndUpdate(
    { tenancyID },
    { isAllTenantsAccepted }
  );

  res.status(200).json(tenancy);
};

// ? Regular Flow
// * @desc      Route to accept a tenancy by PM after RJ2
// ! @route     POST /api/tenancies/tenancy/:tenancyID/pm/approved
const acceptTenancyPM = async (req, res) => {
  const { tenancyID, isTenancyAcceptedByPM } = req.body;

  let tenancy = await Tenancy.findOneAndUpdate(
    { tenancyID },
    { isTenancyAcceptedByPM }
  );
  res.status(200).json(tenancy);
};

// ? Regular Flow
// * @desc      Route to accept all tenants CARDS in a tenancy by Rimbo after RJ3
// ! @route     POST /api/tenancies/tenancy/:tenancyID/allTenantsCardAccepted
const acceptAllTenantsCardsRimbo = async (req, res) => {
  const { tenancyID, isAllCardsAccepted } = req.body;

  let tenancy = await Tenancy.findOneAndUpdate(
    { tenancyID },
    { isAllCardsAccepted }
  );

  res.status(200).json(tenancy);
};

// ? Regular Flow
// * @desc      Route to accept a tenancy by PM after RJ3 cards
// ! @route     POST /api/tenancies/tenancy/:tenancyID/pm/card/approved
const acceptTenancyCardPM = async (req, res) => {
  const { tenancyID, isTenancyCardAcceptedByPM } = req.body;

  let tenancy = await Tenancy.findOneAndUpdate(
    { tenancyID },
    { isTenancyCardAcceptedByPM }
  );
  res.status(200).json(tenancy);
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

  // Create Property
  const property = await Property.create({
    rentalAddress,
    rentalAddressSecond,
    rentalCity,
    rentalPostalCode,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
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

// ? Enso Flow
// * @desc      Route to create a new Tenancy without files attached
// ! @route     POST /api/tenancies/enso
const registerEnsoTenancy = async (req, res) => {
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
    rentalAddress,
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

  // Create Property
  const property = await Property.create({
    rentalAddress,
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

// ? Ukio Flow
// * @desc      Route to create a new Tenancy without files attached
// ! @route     POST /api/tenancies/ukio
const registerUkioTenancy = async (req, res) => {
  const {
    // Tenant
    tenantsFirstName,
    tenantsLastName,
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
    agencyContactPerson,
    isAgentAccepted,

    // Property
    rentalAddress,
    rentalPostalCode,
    rentalCity,
    room,

    // Tenancy
    rentAmount,
    rentStartDate,
    rentEndDate,
    product,
    tenancyID,
  } = req.body;

  // Create Tenant
  const tenant = await Tenant.create({
    tenantsFirstName,
    tenantsLastName,
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
      agencyContactPerson,
      isAgentAccepted,
    });
  } else {
    agent = agent[0];
  }

  // Create Property
  const property = await Property.create({
    rentalAddress,
    rentalPostalCode,
    rentalCity,
    room,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
    rentAmount,
    product,
    rentStartDate,
    rentEndDate,
    tenancyID,

    agent: agent._id,
    property: property._id,
    tenant: tenant._id,
  });
  res.json(tenancy);
};

// ? RoomsWeRent Flow
// * @desc      Route to create a new Tenancy without files attached
// ! @route     POST /api/tenancies/roomswerent
const registerRoomsWeRentTenancy = async (req, res) => {
  const {
    // Tenant
    tenantsFirstName,
    tenantsLastName,
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
    rentalAddress,
    room,

    // Tenancy
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
  } = req.body;

  // Create Tenant
  const tenant = await Tenant.create({
    tenantsFirstName,
    tenantsLastName,
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

  // Create Property
  const property = await Property.create({
    rentalAddress,
    room,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
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

// ? aTemporal Flow
// * @desc      Route to create a new Tenancy without files attached
// ! @route     POST /api/tenancies/atemporal
const registerAtemporalTenancy = async (req, res) => {
  const {
    // Tenant
    tenantsFirstName,
    tenantsLastName,
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
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    isAgentAccepted,

    // Property
    building,
    rentalAddress,

    // Tenancy
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
  } = req.body;

  // Create Tenant
  const tenant = await Tenant.create({
    tenantsFirstName,
    tenantsLastName,
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
  let agent = await Agent.find({ agencyEmailPerson });
  if (agent.length === 0) {
    agent = await Agent.create({
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      isAgentAccepted,
    });
  } else {
    agent = agent[0];
  }

  // Create Property
  const property = await Property.create({
    building,
    rentalAddress,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
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

// ? Demo Flow
// * @desc      Route to create a new Tenancy without files attached
// ! @route     POST /api/tenancies/demo
const registerDemoTenancy = async (req, res) => {
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
    agencyEmailPerson,
    isAgentAccepted,

    // Property
    rentalAddress,
    room,

    // Tenancy
    rentAmount,
    rentStartDate,
    rentEndDate,
    product,
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
  const agent = await Agent.create({
    agencyName,
    agencyEmailPerson,
    isAgentAccepted,
  });

  // Create Property
  const property = await Property.create({
    rentalAddress,
    room,
  });

  // Create Tenancy
  const tenancy = await Tenancy.create({
    rentAmount,
    rentStartDate,
    rentEndDate,
    product,
    tenancyID,

    agent: agent._id,
    property: property._id,
    tenant: tenant._id,
  });
  res.json(tenancy);
};

// ? BigDemo Flow
// * @desc      Route for RJ1 form to create a new Tenancy
// ! @route     POST /api/tenancies/bigdemo
const registerBigDemoTenancy = async (req, res) => {
  const {
    // tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    propertyManagerName,
    randomID,
    stageOne,

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
    agencyLanguage,

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
    tenancyID,
    stageOne,
  });

  let tenantTwo = "";
  if (tenantsNameTwo != "" && tenantsEmailTwo != "" && tenantsPhoneTwo != "") {
    tenantTwo = await Tenant.create({
      tenantsName: tenantsNameTwo,
      tenantsEmail: tenantsEmailTwo,
      tenantsPhone: tenantsPhoneTwo,
      propertyManagerName,
      randomID: randomIDTwo,
      tenancyID,
      stageOne,
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
      tenancyID,
      stageOne,
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
      tenancyID,
      stageOne,
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
  const agent = await Agent.create({
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
    isAgentAccepted,
    agencyLanguage,
  });

  // Create Property
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
    tenancy = await Tenancy.create(tenancyData);
  } else if (tenantTwo != "" && tenantThree === "") {
    tenancy = await Tenancy.create(tenancyDataTwo);
  } else if (tenantThree != "" && tenantTwo != "" && tenantFour === "") {
    tenancy = await Tenancy.create(tenancyDataThree);
  } else if (tenantFour != "" && tenantThree != "" && tenantTwo != "") {
    tenancy = await Tenancy.create(tenancyDataFour);
  }

  res.json(tenancy);
};

// ? PM DASHBOARD
// * @desc      Route to create a new Tenancy
// ! @route     POST /api/tenancies/newtenancy
const registerNewTenancy = async (req, res) => {
  const {
    // tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    propertyManagerName,
    randomID,
    stageOne,

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
    agencyEmailPerson,
    isAgentAccepted,
    agencyLanguage,
    agentID,

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
    tenancyID,
    stageOne,
  });

  let tenantTwo = "";
  if (tenantsNameTwo != "" && tenantsEmailTwo != "" && tenantsPhoneTwo != "") {
    tenantTwo = await Tenant.create({
      tenantsName: tenantsNameTwo,
      tenantsEmail: tenantsEmailTwo,
      tenantsPhone: tenantsPhoneTwo,
      propertyManagerName,
      randomID: randomIDTwo,
      tenancyID,
      stageOne,
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
      tenancyID,
      stageOne,
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
      tenancyID,
      stageOne,
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
  let agent = await Agent.findByIdAndUpdate(agentID, {
    agencyLanguage,
    isAgentAccepted,
  });

  // Create Property
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
    tenancy = await Tenancy.create(tenancyData);
  } else if (tenantTwo != "" && tenantThree === "") {
    tenancy = await Tenancy.create(tenancyDataTwo);
  } else if (tenantThree != "" && tenantTwo != "" && tenantFour === "") {
    tenancy = await Tenancy.create(tenancyDataThree);
  } else if (tenantFour != "" && tenantThree != "" && tenantTwo != "") {
    tenancy = await Tenancy.create(tenancyDataFour);
  }

  res.json(tenancy);
};

// ? Short-Term Flow
// * @desc      Route to create a new Tenancy
// ! @route     POST /api/tenancies/short-term
const registerTenancyPMS = async (req, res) => {
  const {
    // Agency
    agencyName,
    // Tenancy
    rentAmount,
    rentStartDate,
    rentEndDate,
    bookingID,
    product,
    // Tenant
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    // Property
    rentalAddress,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  // Create Tenant
  const tenant = await Tenant.create({
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    bookingID,
  });

  // Create Property
  const property = await Property.create({
    rentalAddress,
    rentalCity,
    rentalPostalCode,
  });

  // Create Agency
  let agent = await Agent.find({ agencyName });
  if (agent.length === 0) {
    agent = await Agent.create({
      agencyName,
    });
  } else {
    agent = agent[0];
  }

  // Create Tenancy
  const tenancy = await Tenancy.create({
    rentAmount,
    rentStartDate,
    rentEndDate,
    bookingID,
    product,

    agent: agent._id,
    property: property._id,
    tenant: tenant._id,
  });
  res.json(tenancy);
};

// ? Short-Term Flow
// * @desc      Route to get a single Tenancy by bookingID
// ! @route     GET /api/tenancies/tenancy/:bookingID
const getTenancyByBookingID = async (req, res) => {
  try {
    const bookingID = req.originalUrl.slice(34);

    const thisTenancy = await Tenancy.findOne({ bookingID })
      .populate("landlord")
      .populate("tenant")
      .populate("tenantTwo")
      .populate("tenantThree")
      .populate("tenantFour")
      .populate("agent")
      .populate("pm")
      .populate("property");
    res.status(200).json(thisTenancy);
  } catch (error) {
    console.log(error);
  }
};

export {
  // Regular
  registerTenancy,
  getAllTenancies,
  acceptAllTenantsRimbo,
  acceptTenancyPM,
  acceptAllTenantsCardsRimbo,
  acceptTenancyCardPM,
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
  // Enso
  registerEnsoTenancy,
  // Ukio
  registerUkioTenancy,
  // RoomsWeRent
  registerRoomsWeRentTenancy,
  // aTemporal
  registerAtemporalTenancy,
  // Demo
  registerDemoTenancy,
  // BigDemo
  registerBigDemoTenancy,
  // PM Dashboard
  registerNewTenancy,
  // Short-Term
  registerTenancyPMS,
  getTenancyByBookingID,
};
