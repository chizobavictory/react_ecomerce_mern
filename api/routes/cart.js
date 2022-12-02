import express from "express";
const router = express.Router();

import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.js";
import { createCart, deleteCart, updateCart, getAllCart, getCart } from "../controller/cartController.js";

router.post("/", verifyToken, createCart); //CREATE
router.delete("/:id", verifyTokenAndAdmin, deleteCart); //DELETE
router.put("/:id", verifyTokenAndAuthorization, updateCart); //UPDATE
router.get("/find/:userId", verifyTokenAndAuthorization, getCart); //READ
router.get("/", verifyTokenAndAdmin, getAllCart); //READ

export default router;
