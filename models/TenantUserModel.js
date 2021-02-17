import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TenantSchema = new Schema(
  {
    tenantsName: { type: String },
    tenantsEmail: { type: String },
    tenantsPhone: { type: String },
    tenantsCostumerId: { type: String },
    isAccepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", TenantSchema);
export default Tenant;
