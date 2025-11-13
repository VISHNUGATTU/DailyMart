import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  vehicleDetails: {
    vehicleType: {
      type: String,
      enum: ["bike","truck"],
      required: true,
    },
    vehicleNumber: { type: String, required: true, unique: true },
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  status: {
    type: String,
    enum: ["available", "on-delivery", "inactive"],
    default: "available",
  },
  createdAt: { type: Date, default: Date.now },
});

const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);

export default Driver;
