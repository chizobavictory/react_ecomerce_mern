import express from "express";
const router = express.Router();

import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controller/productController.js";

router.post("/:id", verifyTokenAndAuthorization, createProduct); //CREATE
router.put("/:id", verifyTokenAndAdmin, updateProduct); //UPDATE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct); //DELETE
router.get("/find/:id", getProduct); //READ
router.get("/", getAllProducts); //READ

export default router;
