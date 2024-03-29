import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tenancySchema = new Schema(
  {
    rentAmount: { type: String },
    rentStart: { type: Boolean, default: false },
    rentStartDate: { type: Date },
    rentDuration: { type: String },
    rentEndDate: { type: Date },
    product: { type: String },
    tenancyID: { type: String },
    bookingID: { type: String },
    pmAnex: { type: String },
    acceptanceCriteria: { type: String },
    isAllTenantsAccepted: { type: Boolean, default: false },
    isTenancyAcceptedByPM: { type: Boolean, default: false },
    isAllCardsAccepted: { type: Boolean, default: false },
    isTenancyCardAcceptedByPM: { type: Boolean, default: false },
    pm: { type: Schema.Types.ObjectId, ref: "PM" },
    property: { type: Schema.Types.ObjectId, ref: "Property" },
    landlord: { type: Schema.Types.ObjectId, ref: "Landlord" },
    tenant: { type: Schema.Types.ObjectId, ref: "Tenant" },
    tenantTwo: { type: Schema.Types.ObjectId, ref: "Tenant" },
    tenantThree: { type: Schema.Types.ObjectId, ref: "Tenant" },
    tenantFour: { type: Schema.Types.ObjectId, ref: "Tenant" },
    agent: { type: Schema.Types.ObjectId, ref: "Agent" },
    date: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const Tenancy = mongoose.model("Tenancy", tenancySchema);
export default Tenancy;
