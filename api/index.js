import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/users.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import cartRoute from "./routes/cart.js";

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

app.use("/users", userRoute);
app.use("/products", productRoute); 
app.use("/order", orderRoute);
app.use("/cart", cartRoute);


