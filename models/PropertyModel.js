import mongoose from "mongoose";
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    rimboService: { type: String },
    rentalDuration: { type: String },
    rentalAddress: { type: String },
    rentalCity: { type: String },
    rentalPostalCode: { type: String },
    monthlyRent: { type: String },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
