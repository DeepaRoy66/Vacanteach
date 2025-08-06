
import mongoose from "mongoose";

const jobStatsSchema = new mongoose.Schema({
  month: { type: String, required: true },
  jobCount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const JobStats = mongoose.models.JobStats || mongoose.model("JobStats", jobStatsSchema);
export default JobStats;
