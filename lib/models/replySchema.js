// lib/models/replySchema.js
import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  applicationId: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantName: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reply || mongoose.model("Reply", replySchema);
