import express from "express";
import multer from "multer";
import { makeAdmin,updateUserPassword, deleteUser, getUser, getAllUsers, getUserStats } from "../controller/userController.js";
import {avatar} from "../controller/uploadController.js"; // Check the path here
import { verifyOTP, login, register, logout } from "../controller/authController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } from "../middlewares/auth.js";
// import { uploadFile } from "../controller/uploadController.js";

const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", register); //CREATE
router.post("/verify-otp", verifyOTP); //VERIFY OTP
router.post("/login", login); //LOGIN
router.get("/logout", logout); //LOGOUT

router.put("/make-admin/:userId", verifyToken, makeAdmin) //MAKE ADMIN
router.put("/:id", verifyTokenAndAuthorization, updateUserPassword); //UPDATE PASSWORD
router.delete("/:id", verifyTokenAndAdmin, deleteUser); //DELETE USER
router.get("/find/:id", verifyTokenAndAuthorization, getUser); //GET A SIGNLE USER
router.get("/", verifyTokenAndAdmin, getAllUsers); //GET ALL USERS
router.get("/stats", verifyTokenAndAdmin, getUserStats); //GET USER STATS

router.post("/upload-avatar/:id", verifyToken, avatar); //UPLOAD AVATAR

export default router;
