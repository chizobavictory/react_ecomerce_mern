import express from "express";
const router = express.Router();

import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.js";
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder, getIncome } from "../controller/orderController.js";


router.post("/", verifyToken, createOrder); //CREATE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder); //DELETE
router.put("/:id", verifyTokenAndAuthorization, updateOrder); //UPDATE
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder); //READ
router.get("/", verifyTokenAndAdmin, getAllOrders); //READ
router.get("/income", verifyTokenAndAdmin, getIncome); //READ

export default router;
