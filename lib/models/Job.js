import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  requiredEmployees: { type: Number, required: true },
  jobCategory: { type: String, required: true },
  subCategory: { type: String },

  // ✅ Updated to match your UI values
  jobLevel: {
    type: String,
    enum: [
      "Entry Level(0-3yrs)",
      "Mid Level(3-5yrs)",
      "Senior Level(5+yrs)",
      "Manager",
      "Director",
      "Executive",
    ],
    required: true,
  },

  jobType: {
    type: String,
    enum: [
      "Full-time",
      "Part-time",
      "Contract",
      "Freelance",
      "Internship",
      "Temporary",
    ],
    required: true,
  },

  experience: { type: String },
  jobLocation: { type: String, required: true },
  offeredSalaryType: { type: String, required: true },
  currency: { type: String, required: true },
  minimum: { type: Number, required: true },
  maximum: { type: Number },
  salaryType: { type: String, required: true },
  hideSalary: { type: Boolean, default: false },
  negotiable: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  description: { type: String, required: true },

  postedBy: { type: String, required: true },
  role: { type: String, default: "organization" },

  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent model overwrite error in Next.js hot reload
export default mongoose.models.Job || mongoose.model("Job", JobSchema);
