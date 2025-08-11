import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    position: { type: String, required: true, trim: true },
    requiredEmployees: { type: Number, required: true, min: [1, "Number of employees must be at least 1"] },
    jobCategory: {
      type: String,
      required: true,
      enum: [
        "IT & Telecommunication",
        "Primary Education",
        "Secondary Education",
        "Higher Education",
        "Special Education",
        "Vocational Training",
        "Early Childhood Education",
        "Language Instruction",
        "STEM Education",
        "Arts Education",
      ],
    },
    subCategory: {
      type: String,
      default: "none",
      enum: [
        "Mathematics",
        "Science",
        "English",
        "Social Studies",
        "Foreign Language",
        "Special Needs Education",
        "Early Literacy",
        "Art and Music",
        "Physical Education",
        "Vocational Skills",
        "none",
      ],
    },
    jobLevel: {
      type: String,
      required: true,
      enum: ["Entry Level", "Mid Level", "Senior Level"],
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full Time", "Part Time", "Contract", "Internship"],
    },
    experience: { type: String, default: "" },
    jobLocation: { type: String, required: true, trim: true },
    offeredSalaryType: { type: String, required: true, enum: ["Range", "Fixed"] },
    currency: { type: String, required: true, enum: ["USD", "NPR", "INR"] },
    minimum: { type: Number, required: true, min: [0, "Minimum salary cannot be negative"] },
    maximum: { type: Number, min: [0, "Maximum salary cannot be negative"] },
    salaryType: { type: String, required: true, enum: ["Monthly", "Yearly", "Hourly"] },
    hideSalary: { type: Boolean, default: false },
    negotiable: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true },
    postedBy: { type: String, required: true },
    role: { type: String, default: "organization", enum: ["organization"] },
    urgent: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Validation for maximum salary when offeredSalaryType is "Range"
jobSchema.path("maximum").validate(function (value) {
  if (this.offeredSalaryType === "Range" && value === undefined) {
    throw new Error("Maximum salary is required for Range salary type");
  }
  if (this.offeredSalaryType === "Range" && value <= this.minimum) {
    throw new Error("Maximum salary must be greater than minimum");
  }
  return true;
}, "Invalid maximum salary");

// Indexes for query performance
jobSchema.index({ position: "text" });
jobSchema.index({ jobLocation: "text" });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ _id: 1 });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;