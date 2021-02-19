// Models
import Tenant from "../models/TenantUserModel.js";
import Agent from "../models/AgentUserModel.js";
import Landlord from "../models/LandlordUserModel.js";
import Property from "../models/PropertyModel.js";
import Tenancy from "../models/TenancyModel.js";
import PM from "../models/PMUserModel.js";

// * @route     POST /api/tenancies
const registerTenancy = async (req, res) => {
  const {
    // tenant from Rj1
    tenantsName,
    tenantsEmail,
    tenantsPhone,

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
  });

  // let tenant = await Tenant.find({ tenantsEmail });
  // if (tenant.length === 0) {
  //   tenant = await Tenant.create({
  //     tenantsName,
  //     tenantsEmail,
  //     tenantsPhone,
  //   });
  // } else {
  //   tenant = await Tenant.updateOne({
  //     tenantsName,
  //     tenantsEmail,
  //     tenantsPhone,
  //     isAccepted,
  //   });
  //   tenant = tenant[0];
  // }

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

    agent: agent._id,
    property: property._id,
    landlord: landlord._id,
    tenant: tenant._id,
    pm: pm._id,
  });
  res.json(tenancy);
};

// * @route     GET /api/tenancies
// const getTenancy = async (req, res) => {
//   const { landlordEmail } = req.body;
//   // buscar tenancies

//   // ! una manera
//   // const allTenancies = await Tenancy.find()
//   //   .populate("landlord")
//   //   .populate("tenant");
//   // console.log(allTenancies);
//   // const landlordsTenancies = [];
//   // allTenancies.map((tenancy) => {
//   //   tenancy.landlord.forEach((landlord) => {
//   //     if (landlord.landlordEmail === landlordEmail) {
//   //       landlordsTenancies.push(tenancy);
//   //     }
//   //   });
//   // });
//   // console.log("object");

//   // ! segunda manera
//   const thisLandlord = await Landlord.findOne({ landlordEmail });

//   // console.log(thisLandlord);

//   const allTenancies = await Tenancy.find()
//     .populate("tenant")
//     .populate("agent")
//     .populate("property")
//     .populate("pm");

//   const landlordsTenancies = [];

//   allTenancies.map((tenancy) => {
//     tenancy.landlord.forEach((landlord) => {
//       if (landlord == thisLandlord.id) {
//         landlordsTenancies.push(tenancy);
//       }
//     });
//   });
//   // ! How to access to this data...
//   // console.log("This is property");
//   // console.log(landlordsTenancies[0].property[0]);
//   res.json(landlordsTenancies);
// };

// * @route     GET /api/tenancies
const getAllTenancies = async (req, res) => {
  try {
    const tenancies = await Tenancy.find();
    res.json(tenancies);
  } catch (error) {
    console.log(error);
  }
};

export { registerTenancy, getAllTenancies };
