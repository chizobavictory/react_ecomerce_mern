import { userModel, OTPModel } from "../models/UserModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import generateOTP from "../utils/otpGenerator.js";
import sendMail from "../utils/mailService.js";
import Cart from "../models/CartModel.js";

const OTP = generateOTP();

//REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const user = await userModel.findOne({
      email: email,
    });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const passwordEncrypted = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
    const newUser = new userModel({
      username: username,
      email: email,
      password: passwordEncrypted,
    });

    newUser.save(async (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: err,
        });
      } else {
        sendMail(user.username, user.email, OTP);
        const otp = await OTPModel({ _id: user._id, otp: OTP });
        await otp.save();
        return res.json({
          success: true,
          message: "User created successfully. Please check your email for the OTP to verify your account.",
          user: user,
        });
      }
    });


    console.log("User successfully registered");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check if user is verified
    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your account by checking your email for the OTP",
      });
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials!",
      });
    }

    const cart = await Cart.findById(user._id);

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    return res.status(200).json({
      success: true,
      ...others,
      cart: cart,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//VERIFY OTP
export const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const storedOTP = await OTPModel.findOne({ _id: userId });
    if (!storedOTP) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (storedOTP.otp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token").json("User has been Logged out");
  } catch (err) {
    res.status(500).json(err);
  }
};