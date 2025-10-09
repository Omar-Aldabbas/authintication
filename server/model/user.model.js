import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      trim: true,
      unique: true,
      minlength: [3, "Username should be at least 3 letters"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [8, "Password should be at least 8 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: { type: String, trim: true },
    mobile: {
      type: String,
      match: [/^\+?\d{7,15}$/, "Please enter a valid phone number"],
    },
    profile: { type: String, default: "" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
