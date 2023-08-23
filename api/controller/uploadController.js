import { userModel, OTPModel } from "../models/UserModel.js";
const { upload } = require("../cloudinary").default;
const { upload } = require("../cloudinary").default;
const fs = require("fs");
const dir = "tmp";

const avatarUpload = async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (user) {
      if (!req.files) return res.send("Please upload an image");

      const { image } = req.files;
      const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
      const imageSize = 1024;
      image.name = req.params.id;
      image.public_id = req.params.id;
      console.log(image.tempFilePath);
      fs.rename(image.tempFilePath, `${dir}\\${req.params.id}`, (err) => {
        if (err) throw err;
      });
      image.tempFilePath = `${dir}\\${req.params.id}`;
      console.log(image);
      if (!fileTypes.includes(image.mimetype)) return res.send("Image formats supported: JPG, PNG, JPEG");

      if (image.size / 1024 > imageSize) return res.send(`Image size should be less than ${imageSize}kb`);

      const cloudFile = await upload(image.tempFilePath);

      user.img = cloudFile.url;
      user = await user.save();
      user.password = undefined;
      if (user) {
        // remove password from user object
        res.json({
          success: true,
          message: "User avatar updated",
          user: user,
        });
      } else {
        res.status(500).json({
          message: "Error updating user avatar",
          error: err,
        });
      }

      fs.rm(dir, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }

        console.log(`${dir} is deleted!`);
      });
    } else {
      res.status(409).json({
        message: "User does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error uploading avatar",
      error: err,
    });
  }
};

export default avatarUpload;
