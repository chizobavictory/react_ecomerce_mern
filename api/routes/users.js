import express from "express";
const router = express.Router();

import { makeAdmin,updateUserPassword, deleteUser, getUser, getAllUsers, getUserStats } from "../controller/userController.js";
import { verifyOTP, login, register, logout } from "../controller/authController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } from "../middlewares/auth.js";

router.post("/register", register); //CREATE
router.post("/verify-otp", verifyOTP); //VERIFY OTP
router.post("/login", login); //LOGIN
router.get("/logout", logout); //LOGOUT

router.put("/make-admin/:userId", verifyToken, makeAdmin) //MAKE ADMIN
router.put("/:id", verifyTokenAndAuthorization, updateUserPassword); //UPDATE PASSWORD
router.delete("/:id", verifyTokenAndAuthorization, deleteUser); //DELETE
router.get("/find/:id", verifyTokenAndAdmin, getUser); //READ
router.get("/", verifyTokenAndAdmin, getAllUsers); //READ
router.get("/stats", verifyTokenAndAdmin, getUserStats);

export default router;
