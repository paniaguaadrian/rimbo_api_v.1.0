import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PMSchema = new Schema(
  {
    PMName: { type: String },
    PMEmail: { type: String },
    PMPhone: { type: Number },
    PMAnex: { type: String },
  },
  { timestamps: true }
);

const PM = mongoose.model("PM", PMSchema);
export default PM;
