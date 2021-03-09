import mongoose from "mongoose";
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    rentalAddress: { type: String },
    rentalCity: { type: String },
    rentalPostalCode: { type: String },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
