import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  requiredEmployees: { type: Number, required: true },
  jobCategory: { type: String, required: true },
  experience: { type: String }, // optional
  jobLocation: { type: String, required: true },
  currency: { type: String, required: true },
  minimum: { type: Number, required: true },
  maximum: { type: Number, required: true },
  salaryType: { type: String, required: true },
  postedBy: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
