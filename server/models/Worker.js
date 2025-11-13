import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["packer", "warehouse", "delivery-support", "helper"],
    required: true,
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignedWarehouse: { type:String , required: true },
  status: {
    type: String,
    enum: ["active", "inactive", "on-leave"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
});

const Worker = mongoose.models.Worker || mongoose.model("Worker", workerSchema);

export default Worker;
