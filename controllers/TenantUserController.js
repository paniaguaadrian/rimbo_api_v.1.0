// Model
import Tenant from "../models/TenantUserModel.js";

// * @desc      Route for RJ3 to get a single Tenant info
// ! @route     GET /api/tenant/:randomID
const getSingleTenant = async (req, res) => {
  try {
    const randomID = req.originalUrl.slice(12);

    const thisTenant = await Tenant.findOne({ randomID });
    res.status(200).json(thisTenant);
  } catch (error) {
    console.log(error);
  }
};

// * @desc      Route to register new information of tenant at RJ2
// ! @route     POST /api/tenants/:randomID
const registerTenantRJ2 = async (req, res) => {
  const {
    monthlyNetIncome,
    jobType,
    documentType,
    documentNumber,
    tenantsAddress,
    tenantsZipCode,
    documentImageFront,
    documentImageBack,
    documentConfirmAddress,
    isAcceptedPrivacy,
    randomID,
  } = req.body;

  let tenant = await Tenant.findOneAndUpdate(
    { randomID },
    {
      monthlyNetIncome,
      jobType,
      documentType,
      documentNumber,
      tenantsAddress,
      tenantsZipCode,
      documentImageFront,
      documentImageBack,
      documentConfirmAddress,
      isAcceptedPrivacy,
    }
  );
  res.status(200).json(tenant);
};

// * @desc      Route to get all tenants on the DB
// ! @route     GET /api/tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    console.log("Error on get all tenants " + error);
  }
};

// * @desc      Route to register new tenant debit card details at RJ3
// ! @route     POST /api/tenants/stripe/:randomID
const registerTenantRJ3 = async (req, res) => {
  const { isAccepted, randomID } = req.body;

  let tenant = await Tenant.findOneAndUpdate(
    { randomID },
    {
      isAccepted,
    }
  );
  res.status(200).json(tenant);
};

export { registerTenantRJ2, getAllTenants, getSingleTenant, registerTenantRJ3 };
