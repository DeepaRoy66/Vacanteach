import { Schema, models, model } from 'mongoose';

const JobApplicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  coverLetter: {
    type: String,
    trim: true,
  },
  cv: {
    type: String,
    required: true,
  },
  replies: [
    {
      subject: {
        type: String,
        required: true,
        trim: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
      postedBy: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

JobApplicationSchema.index({ jobId: 1, email: 1 });

export default models.JobApplication || model('JobApplication', JobApplicationSchema);