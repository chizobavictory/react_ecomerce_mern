import express from "express";
import { register, login, updateUser } from "../controller/userController.js";
import { verifyTokenAndAuthorization } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register); //CREATE
router.post("/login", login); //LOGIN
router.put("/:id", verifyTokenAndAuthorization, updateUser ); //UPDATE

export default router;
