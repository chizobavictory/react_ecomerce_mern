import express from "express";
import { Router } from "express";
import multer from "multer"
import {avatarUpload} from "../controller/uploadController";
import { verifyTokenAndAuthorization } from "../middlewares/auth";

const router = Router();

app.post("/upload/:id",verifyTokenAndAuthorization, avatarUpload)

export default router;
