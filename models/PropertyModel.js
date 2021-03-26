import mongoose from "mongoose";
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    fullRentalAddress: { type: String },
    rentalAddress: { type: String },
    rentalAddressSecond: { type: String },
    rentalCity: { type: String },
    rentalPostalCode: { type: String },
    building: { type: String },
    room: { type: String },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
