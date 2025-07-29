import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["teacher", "organization", null],
      default: null,
    },
    profileCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;