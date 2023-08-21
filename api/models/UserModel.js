import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    img: { type: String, required: false },
  },
  { timestamps: true }
);

const OTPSchema = new Schema({
  otp: {
    type: String,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const OTPModel = mongoose.model("OTP", OTPSchema);
const userModel = mongoose.model("User", UserSchema);

OTPSchema.plugin(autopopulate);

export { userModel, OTPModel };
