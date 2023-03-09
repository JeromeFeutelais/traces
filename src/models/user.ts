import mongoose from "mongoose";

const schema = mongoose.Schema

const User = new schema({
  name: { type: String, required: false },
  email: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  validationToken: { type: String, required: true },
  validated: { type: Boolean, default: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
});

export default mongoose.model("User", User)