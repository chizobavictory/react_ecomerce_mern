import express from "express";
const router = express.Router();

import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.js";


export default router;
