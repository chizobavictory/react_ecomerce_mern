import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import userRoute from "./routes/users.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import cartRoute from "./routes/cart.js";
// import uploadRoute from "./routes/upload.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connection Successfull"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

const PORT = 5000;
app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running on port: ${PORT}`);
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/cart", cartRoute);
// app.use("/api/v1/upload", uploadRoute);
