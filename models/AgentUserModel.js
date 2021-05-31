import mongoose from "mongoose";
const Schema = mongoose.Schema;

const agentSchema = new Schema(
  {
    agencyName: { type: String },
    agencyContactPerson: { type: String },
    agencyEmailPerson: { type: String },
    agencyPersonPassword: { type: String },
    agencyPhonePerson: { type: String },
    isAgentAccepted: { type: Boolean, default: false },
    isAgentValidated: { type: Boolean, default: false },
    documentSepa: { type: String },
    agencyLanguage: { type: String },
    tenancy: { type: Schema.Types.ObjectId, ref: "Tenancy" },
    tenant: { type: Schema.Types.ObjectId, ref: "Tenant" },
    property: { type: Schema.Types.ObjectId, ref: "Property" },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
