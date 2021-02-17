import mongoose from "mongoose";
const Schema = mongoose.Schema;

const landlordSchema = new Schema(
  {
    landlordName: { type: String, required: true },
    landlordEmail: { type: String, required: true },
    landlordPhone: { type: Number, required: true },
  },
  { timestamps: true }
);

const Landlord = mongoose.model("Landlord", landlordSchema);
export default Landlord;
