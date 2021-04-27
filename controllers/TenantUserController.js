import Tenant from "../models/TenantUserModel.js";

// ? Regular Flow
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

// ? Regular Flow
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

// ? Regular Flow
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
    stageOne,
    randomID,
    // ? This is for Badi Flow ⬇️
    // isAcceptedGC,
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
      stageOne,
      // ? This is for Badi Flow ⬇️
      // isAcceptedGC,
    }
  );
  res.status(200).json(tenant);
};

// ? Regular Flow
// * @desc      Route to upload images and files of tenant at RJ2
// ! @route     POST /api/tenants/tenant/:randomID/upload
const registerTenantRJ2Upload = async (req, res) => {
  const { randomID } = req.body;

  const DF = req.files[0];
  const DB = req.files[1];
  const DCA = req.files[2];

  // ? This is for Badi Flow
  // const LP = req.files[2];
  // const PP = req.files[3];

  const DFUrl = DF.linkUrl;
  const DBUrl = DB.linkUrl;
  const DCAUrl = DCA.linkUrl;

  // ? This is for Badi Flow
  // const LPUrl = LP.linkUrl;
  // const PPUrl = PP.linkUrl;

  let tenant = await Tenant.findOneAndUpdate(
    { randomID },
    {
      documentImageFront: DFUrl,
      documentImageBack: DBUrl,
      documentConfirmAddress: DCAUrl,
      // lastPayslip: LPUrl,
      // previousPayslip: PPUrl,
    }
  );
  res.status(200).json(tenant);
};

// ? Regular Flow
// * @desc      Route to accept a tenant by Rimbo after RJ2, on RJXX3 email
// ! @route     POST /api/tenants/tenant/:randomID/approved
const acceptTenantRimbo = async (req, res) => {
  const { randomID, isRimboAccepted } = req.body;

  let tenant = await Tenant.findOneAndUpdate({ randomID }, { isRimboAccepted });

  res.status(200).json(tenant);
};

// ? Regular Flow
// * @desc      Route to accept a tenant by PM after RJ2, on RJ11 email
// ! @route     POST /api/tenants/tenant/:randomID/pm/approved
const acceptTenantPM = async (req, res) => {
  const { randomID, isPMAccepted } = req.body;

  let tenant = await Tenant.findOneAndUpdate({ randomID }, { isPMAccepted });
  res.status(200).json(tenant);
};

// ? Regular Flow
// * @desc      Route to accept a tenant Card by Rimbo after RJ2, on RJ15 email
// ! @route     POST /api/tenants/tenant/:randomID/card/approved
const acceptTenantCard = async (req, res) => {
  const { randomID, isCardAccepted } = req.body;

  let tenant = await Tenant.findOneAndUpdate({ randomID }, { isCardAccepted });
  res.status(200).json(tenant);
};

// ? Regular Flow
// * @desc      Route to register new tenant debit card details at RJ3
// ! @route     POST /api/tenants/stripe/:randomID
const registerTenantRJ3 = async (req, res) => {
  const { isAcceptedGC, randomID } = req.body;

  let tenant = await Tenant.findOneAndUpdate(
    { randomID },
    {
      isAcceptedGC,
    }
  );
  res.status(200).json(tenant);
};

// ? Enso Flow
// * @desc      Route to register a new tenant from enso product/stripe
// ! @route     POST /api/tenants/enso
const registerEnsoTenants = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    propertyManagerName,
    isAccepted,
    randomID,
  } = req.body;

  const user = await Tenant.create({
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    propertyManagerName,
    isAccepted,
    randomID,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      tenantsName: user.tenantsName,
      tenantsEmail: user.tenantsEmail,
      tenantsPhone: user.tenantsPhone,
      propertyManagerName: user.propertyManagerName,
      isAccepted: user.isAccepted,
      randomID: user.randomID,
    });
  }
};

// ? Enso Flow
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

// ? StarCity Flow
// * @desc      Route to upload images and files of tenant at F1SC
// ! @route     POST /api/tenants/tenant/:randomID/starcity/upload
const addFilesTenantSC = async (req, res) => {
  const { randomID } = req.body;

  const DF = req.files[0];
  const DB = req.files[1];

  const DFUrl = DF.linkUrl;
  const DBUrl = DB.linkUrl;

  let tenant = await Tenant.findOneAndUpdate(
    { randomID },
    {
      documentImageFront: DFUrl,
      documentImageBack: DBUrl,
    }
  );
  res.status(200).json(tenant);
};

// ? StarCity Flow
// * @desc      Route to know if tenant enter on RJ3 / card registration page
// ! @route     POST /api/tenants/tenant/:randomID/payment/try
const tenantTryPayment = async (req, res) => {
  const { randomID, isTrying } = req.body;

  let tenant = await Tenant.findOneAndUpdate({ randomID }, { isTrying });
  res.status(200).json(tenant);
};

export {
  // Regular
  registerTenantRJ2,
  registerTenantRJ2Upload,
  acceptTenantRimbo,
  getAllTenants,
  getSingleTenant,
  registerTenantRJ3,
  acceptTenantPM,
  acceptTenantCard,
  // Enso
  registerEnsoTenants,
  getAllEnsoTenants,
  // StarCity
  addFilesTenantSC,
  tenantTryPayment,
};
