import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["organization", null],
    default: "organization",
  },
  profileCompleted: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Organization = mongoose.models.Organization || mongoose.model("Organization", organizationSchema);

export default Organization;