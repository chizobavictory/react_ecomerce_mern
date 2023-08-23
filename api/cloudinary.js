// cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (file) => {
  console.log(file);
  const image = await cloudinary.uploader.upload(file, { use_filename: true, unique_filename: false, overwrite: true }, (result) => result);
  return image;
};

export default { upload };
