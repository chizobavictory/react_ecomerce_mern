import express from "express";
import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";
import {avatar} from "../controller/uploadController.js"; // Check the path here
const router = Router();

// Use the router object to define your route, not 'app'
router.post("/:id", verifyToken, avatar);

export default router;
