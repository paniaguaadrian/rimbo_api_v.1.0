import mongoose from "mongoose";
const Schema = mongoose.Schema;

const landlordSchema = new Schema(
  {
    landlordName: { type: String },
    landlordEmail: { type: String },
    landlordPhone: { type: Number },
  },
  { timestamps: true }
);

const Landlord = mongoose.model("Landlord", landlordSchema);
export default Landlord;
