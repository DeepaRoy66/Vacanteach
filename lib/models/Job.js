
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  requiredEmployees: { type: Number, required: true },
  jobCategory: { type: String, required: true },
  subCategory: { type: String },
  jobLevel: { type: String, required: true },
  jobType: { type: String, required: true },
  experience: { type: String, required: true }, // Merged duplicate field
  jobLocation: { type: String, required: true },
  offeredSalaryType: { type: String, required: true, enum: ["Range", "Fixed"] },
  currency: { type: String, required: true, enum: ["USD", "NPR", "INR"] },
  minimum: { type: Number, required: true },
  maximum: { type: Number },
  salaryType: { type: String, required: true, enum: ["Monthly", "Yearly", "Hourly"] },
  hideSalary: { type: Boolean, default: false },
  negotiable: { type: Boolean, default: false },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
  role: { type: String, default: "organization", enum: ["organization"] },
  urgent: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Middleware to update `updatedAt` on save
jobSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
