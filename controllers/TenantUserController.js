import Tenant from "../models/TenantUserModel.js";

// * @desc      Route to get all tenants
// ! @route     GET /api/tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    console.log("Error on get all tenants: " + error);
  }
};

// * @desc      Route for RJ3 to get a single Tenant
// ! @route     GET /api/tenants/tenant/:randomID
const getSingleTenant = async (req, res) => {
  try {
    const randomID = req.originalUrl.slice(20);

    const thisTenant = await Tenant.findOne({ randomID });
    res.status(200).json(thisTenant);
  } catch (error) {
    console.log(error);
  }
};

// * @desc      Route to register new information of tenant at RJ2
// ! @route     POST /api/tenants/tenant/:randomID
const registerTenantRJ2 = async (req, res) => {
  const {
    monthlyNetIncome,
    jobType,
    documentType,
    documentNumber,
    tenantsAddress,
    tenantsZipCode,
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
      isAcceptedPrivacy,
    }
  );
  res.status(200).json(tenant);
};

// * @desc      Route to upload images and files of tenant at RJ2
// ! @route     POST /api/tenants/tenant/:randomID/upload
const registerTenantRJ2Upload = async (req, res) => {
  const { randomID } = req.body;

  const DF = req.files[0];
  const DB = req.files[1];
  const DCA = req.files[2];

  const DFUrl = DF.linkUrl;
  const DBUrl = DB.linkUrl;
  const DCAUrl = DCA.linkUrl;

  let tenant = await Tenant.findOneAndUpdate(
    { randomID },
    {
      documentImageFront: DFUrl,
      documentImageBack: DBUrl,
      documentConfirmAddress: DCAUrl,
    }
  );
  res.status(200).json(tenant);
};

// * @desc      Route to accept a tenant by Rimbo after RJ2, on RJXX3 email
// ! @route     POST /api/tenants/tenant/:randomID/approved
const acceptTenantRimbo = async (req, res) => {
  const { randomID, isRimboAccepted } = req.body;

  let tenant = await Tenant.findOneAndUpdate({ randomID }, { isRimboAccepted });
  res.status(200).json(tenant);
};

// * @desc      Route to accept a tenant by PM after RJ2, on RJ11 email
// ! @route     POST /api/tenants/tenant/:randomID/pm/approved
const acceptTenantPM = async (req, res) => {
  const { randomID, isPMAccepted } = req.body;

  let tenant = await Tenant.findOneAndUpdate({ randomID }, { isPMAccepted });
  res.status(200).json(tenant);
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

// * @desc      Route to register a new tenant from enso product/stripe
// ! @route     POST /api/tenants/enso
const registerEnsoTenants = async (req, res) => {
  const { tenantsName, tenantsEmail, tenantsPhone, isAccepted } = req.body;

  const user = await Tenant.create({
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    isAccepted,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      tenantsName: user.tenantsName,
      tenantsEmail: user.tenantsEmail,
      tenantsPhone: user.tenantsPhone,
      isAccepted: user.isAccepted,
    });
  }
};

// * @desc      Route to get allTenants from enso product/stripe
// ! @route     GET /api/tenants/enso
const getAllEnsoTenants = async (req, res) => {
  try {
    const Tenants = await Tenant.find();
    res.json(Tenants);
  } catch (error) {
    console.log(error);
  }
};

export {
  registerTenantRJ2,
  registerTenantRJ2Upload,
  acceptTenantRimbo,
  getAllTenants,
  getSingleTenant,
  registerTenantRJ3,
  registerEnsoTenants,
  getAllEnsoTenants,
  acceptTenantPM,
};
