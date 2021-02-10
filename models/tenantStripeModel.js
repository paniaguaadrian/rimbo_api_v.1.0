import mongoose from "mongoose";

const userStripeSchema = mongoose.Schema(
  {
    tenantsName: { type: String },
    tenantsEmail: { type: String },
    tenantsPhone: { type: Number },
    tenantsCostumerId: { type: String },
    isAccepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TenantStripe = mongoose.model("TenantStripe", userStripeSchema);

// On TenantStripe we can run commands like find, create, delete, update..
export default TenantStripe;
