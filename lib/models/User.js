// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['client', 'teacher'], required: true },
    profileCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already defined (important when using Next.js with hot reloading)
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
