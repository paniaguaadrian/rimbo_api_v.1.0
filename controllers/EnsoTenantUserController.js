// Model
import Tenant from "../models/TenantUserModel.js";

// * @route     POST /api/enso/tenants
const registerEnsoTenant = async (req, res) => {
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

// * @route     GET /api/enso/tenants
const getEnsoTenants = async (req, res) => {
  try {
    const Tenants = await Tenant.find();
    res.json(Tenants);
  } catch (error) {
    console.log(error);
  }
};

export { registerEnsoTenant, getEnsoTenants };
