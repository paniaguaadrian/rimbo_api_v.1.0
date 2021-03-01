import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TenantSchema = new Schema(
  {
    // * RJ1, RJ3 and Enso.
    // RJ3 is for internal, but it's also with Stripe. Ther we don't get tenantsName etc... but yes the isAccepted.
    tenantsName: { type: String },
    tenantsEmail: { type: String },
    tenantsPhone: { type: String },
    propertyManagerName: { type: String },
    tenantsCostumerId: { type: String },
    isAccepted: { type: Boolean, default: false }, // This is from Stripe when he pays
    randomID: { type: String }, //random if from form client side with nanoid
    tenantRimboService: { type: String },

    // * RJ2
    monthlyNetIncome: { type: Number },
    jobType: { type: String },
    documentType: { type: String },
    documentNumber: { type: String },
    tenantsAddress: { type: String },
    tenantsZipCode: { type: Number },
    documentImageFront: { type: String },
    documentImageBack: { type: String },
    documentConfirmAddress: { type: String },
    isAcceptedPrivacy: { type: Boolean },
    // * RJS
    // THis is an agent form, but we will take the startTenancyDate from here as well.
    startTenancyDateT: { type: Date }, // ! How to store Dates?
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", TenantSchema);
export default Tenant;
