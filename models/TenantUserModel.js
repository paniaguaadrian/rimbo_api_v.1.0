import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TenantSchema = new Schema(
  {
    tenantsName: { type: String },
    tenantsEmail: { type: String },
    tenantsPhone: { type: String },
    propertyManagerName: { type: String },
    isAccepted: { type: Boolean, default: false },
    isTrying: { type: Boolean, default: false },
    isRimboAccepted: { type: Boolean, default: false },
    isPMAccepted: { type: Boolean, default: false },
    isCardAccepted: { type: Boolean, default: false },
    randomID: { type: String },
    tenancyID: { type: String },
    monthlyNetIncome: { type: Number },
    jobType: { type: String },
    documentType: { type: String },
    documentNumber: { type: String },
    tenantsAddress: { type: String },
    tenantsZipCode: { type: String },
    documentImageFront: { type: String },
    documentImageBack: { type: String },
    documentConfirmAddress: { type: String },
    lastPayslip: { type: String },
    previousPayslip: { type: String },
    isAcceptedPrivacy: { type: Boolean, default: false },
    isAcceptedGC: { type: Boolean, default: false },
    stageOne: { type: Number, default: 0 },
    //TODO: Variable language
    tenantsLanguage: { type: String },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", TenantSchema);
export default Tenant;
