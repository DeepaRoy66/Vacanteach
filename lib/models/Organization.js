// lib/organization.js
import mongoose from "mongoose";

// Define the Organization Schema
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
    enum: ["client", "teacher"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Organization model (only create if it doesn't already exist)
const Organization =
  mongoose.models.Organization ||
  mongoose.model("Organization", organizationSchema);

export default Organization;