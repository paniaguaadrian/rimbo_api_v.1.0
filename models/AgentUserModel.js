import mongoose from "mongoose";
const Schema = mongoose.Schema;

const agentSchema = new Schema(
  {
    // RJ1
    agencyName: { type: String },
    agencyContactPerson: { type: String },
    agencyEmailPerson: { type: String },
    agencyPhonePerson: { type: String },
    isAgentAccepted: { type: Boolean, default: false },
    // RJS
    documentSepa: { type: String },
    startTenancyDateA: { type: Date },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
