// Model
import Tenant from "../models/TenantUserModel.js";

// * @route     POST /api/tenants
const registerTenant = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
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
  } = req.body;

  let tenant = await Tenant.findOne({ tenantsEmail });

  if (tenant) {
    await Tenant.findOneAndUpdate(
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      monthlyNetIncome,
      jobType,
      documentType,
      documentNumber,
      tenantsAddress,
      tenantsZipCode,
      documentImageFront,
      documentImageBack,
      documentConfirmAddress,
      {
        $set: {
          isAcceptedPrivacy: true,
        },
      }
    );
  } else {
    tenant = await Tenant.create({
      tenantsName,
      tenantsEmail,
      tenantsPhone,
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
