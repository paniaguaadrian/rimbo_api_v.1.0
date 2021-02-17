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
    // tenant
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    isAccepted,
    // agency agent
    agencyName,
    agencyEmailPerson,
    agencyContactPerson,
    agencyPhonePerson,
    // property apartment
    rimboService,
    rentalDuration,
    rentalCity,
    rentalPostalCode,
    monthlyRent,
    ownerType,
    rentalAddress,
    // landlord
    landlordName,
    landlordEmail,
    landlordPhone,
    // property manager
    PMName,
    PMEmail,
    PMPhone,
  } = req.body;

  let pm = await PM.find({ PMEmail });
  if (pm.length === 0) {
    pm = await PM.create({
      PMName,
      PMEmail,
      PMPhone,
    });
  } else {
    pm = pm[0];
  }

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

  let agent = await Agent.find({ agencyEmailPerson });
  if (agent.length === 0) {
    agent = await Agent.create({
      agencyName,
      agencyEmailPerson,
      agencyContactPerson,
      agencyPhonePerson,
    });
  } else {
    agent = agent[0];
  }

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

  let tenant = await Tenant.find({ tenantsEmail });
  if (tenant.length === 0) {
    tenant = await Tenant.create({
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      isAccepted,
    });
  } else {
    // tenant = await Tenant.updateOne({
    //   tenantsName,
    //   tenantsEmail,
    //   tenantsPhone,
    //   isAccepted,
    // });
    tenant = tenant[0];
  }

  const tenancy = await Tenancy.create({
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

const getAllTenancies = async (req, res) => {
  try {
    const tenancies = await Tenancy.find();
    res.json(tenancies);
  } catch (error) {
    console.log(error);
  }
};

export { registerTenancy, getAllTenancies };
