// Model
import Tenant from "../models/TenantUserModel.js";

// * @route     POST /api/tenants
const registerTenant = async (req, res) => {
  // const { tenantsEmail } = req.body;

  // const tenant = await Tenant.findOneAndUpdate(tenantsEmail, {
  //   $set: { isAccepted: true },
  // });

  const { tenantsName, tenantsEmail, tenantsPhone, isAccepted } = req.body;

  let tenant = await Tenant.findOne({ tenantsEmail });

  if (tenant) {
    await Tenant.findOneAndUpdate(tenantsEmail, {
      $set: { isAccepted: true },
    });
  } else {
    tenant = await Tenant.create({
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      isAccepted,
    });
  }

  res.status(200).json(tenant);
};

// * @route     GET /api/tenants
const getAllTenants = async (req, res) => {
  try {
    const Tenants = await Tenant.find();
    res.json(Tenants);
  } catch (error) {
    console.log(error);
  }
};

export { registerTenant, getAllTenants };
