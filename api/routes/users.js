import express from "express";
import { register, login, updateUser, deleteUser, getUser, getAllUsers, getUserStats } from "../controller/userController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register); //CREATE
router.post("/login", login); //LOGIN
router.put("/:id", verifyTokenAndAuthorization, updateUser); //UPDATE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser); //DELETE
router.get("/find/:id", verifyTokenAndAdmin, getUser); //READ
router.get("/", verifyTokenAndAdmin, getAllUsers); //READ
router.get("/stats", verifyTokenAndAdmin, getUserStats)

export default router;
