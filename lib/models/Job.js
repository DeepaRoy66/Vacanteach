
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  requiredEmployees: { type: Number, required: true },
  jobCategory: { type: String, required: true },
  subCategory: { type: String },
  jobLevel: { type: String, required: true },
  jobType: { type: String, required: true },
  experience: { type: String },
  jobLocation: { type: String, required: true },
  offeredSalaryType: { type: String, required: true },
  currency: { type: String, required: true },
  minimum: { type: Number, required: true },
  maximum: { type: Number },
  salaryType: { type: String, required: true },
  hideSalary: { type: Boolean, default: false },
  negotiable: { type: Boolean, default: false },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
  role: { type: String, default: "organization" },
  urgent: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
