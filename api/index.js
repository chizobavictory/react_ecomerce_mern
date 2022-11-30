import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull"))
  .catch((err) => console.log(err));

app.use(express.json());

const PORT = 5000;
app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running on port: ${PORT}`);
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

