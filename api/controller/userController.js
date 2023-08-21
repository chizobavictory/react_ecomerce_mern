import { userModel, OTPModel } from "../models/UserModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import generateOTP from "../utils/otpGenerator.js";
import sendMail from "../utils/mailService.js";
import Cart from "../models/CartModel.js";

//MAKE USER ADMIN
export const makeAdmin = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User has been updated to an Admin",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
    

//UPDATE USER PASSWORD
export const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both oldPassword and newPassword are required" });
  }

  const userId = req.params.id;
  try {

    const user = await userModel.findById(userId);

    if (!user) {
      console.log(user)
      return res.status(404).json({ message: "User not found" });
    }

    const hashedOldPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalOldPassword = hashedOldPassword.toString(CryptoJS.enc.Utf8);

    if (originalOldPassword !== oldPassword) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    const updatedPassword = CryptoJS.AES.encrypt(newPassword, process.env.PASS_SEC).toString();

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      { password: updatedPassword },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "User password has been updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Unable to update user password" });
  }
};



//DELETE
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await userModel.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//GET USER
export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL USERS
export const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    let users;

    if (query) {
      users = await userModel.find().sort({ _id: -1 }).limit(5);
    } else {
      // Exclude the password field from the query results using projection
      users = await userModel.find({}, { password: 0 });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: 'Unable to fetch users' });
  }
};



export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

//GET USER STATS
export const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await userModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};


