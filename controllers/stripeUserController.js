// Model
import TenantStripe from "../models/tenantStripeModel.js";

// * @desc      Registrer a new stripe Tenant
// * @route     POST /api/stripe-tenants
// * @access    Public (by now)
// * @from      Enso co-living stripe tenant workflow
const registerTenant = async (req, res) => {
  const { tenantsName, tenantsEmail, tenantsPhone, isAccepted } = req.body;

  const user = await TenantStripe.create({
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

// * @desc      Registrer a new stripe Tenant
// * @route     GET /api/stripe-tenants
// * @access    Public (by now)
// * @to        Any internal dashboard for Rimbo
const getEnsoTenants = async (req, res) => {
  try {
    const EnsoTenants = await TenantStripe.find();
    res.json(EnsoTenants);
  } catch (error) {
    console.log(error);
  }
};

export { registerTenant, getEnsoTenants };
