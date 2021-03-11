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
    pmAnex: { type: String },

    pm: { type: Schema.Types.ObjectId, ref: "PM" },
    property: { type: Schema.Types.ObjectId, ref: "Property" },
    landlord: { type: Schema.Types.ObjectId, ref: "Landlord" },
    tenant: { type: Schema.Types.ObjectId, ref: "Tenant" },
    agent: { type: Schema.Types.ObjectId, ref: "Agent" },
  },
  { timestamps: true }
);

const Tenancy = mongoose.model("Tenancy", tenancySchema);
export default Tenancy;
