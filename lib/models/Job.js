import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true, trim: true },
  requiredEmployees: { type: Number, required: true, min: 1 },
  jobCategory: { type: String, required: true, trim: true },
  subCategory: { type: String, default: null, trim: true },
  jobLevel: { type: String, required: true, trim: true },
  jobType: { type: String, required: true, trim: true },
  experience: { type: String, default: null, trim: true }, // Optional
  jobLocation: { type: String, required: true, trim: true },
  offeredSalaryType: { type: String, required: true, enum: ['Range', 'Fixed'] },
  currency: { type: String, required: true, trim: true },
  minimum: { type: Number, default: null }, // Optional, validated in API
  maximum: { type: Number, default: null }, // Optional, validated in API
  salaryType: { type: String, required: true, trim: true },
  hideSalary: { type: Boolean, default: false },
  negotiable: { type: Boolean, default: false }, // False when hideSalary is true
  active: { type: Boolean, default: true },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [50, 'Job description must be at least 50 characters.'],
    maxlength: [5000, 'Job description cannot exceed 5000 characters.'],
  },
  postedBy: { type: String, required: true, trim: true },
  org_id: { type: String, required: true, trim: true }, // Added organization ID
  role: { type: String, default: 'organization', trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure negotiable is false when hideSalary is true
jobSchema.pre('validate', function (next) {
  if (this.hideSalary) {
    this.negotiable = false;
  }
  next();
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);