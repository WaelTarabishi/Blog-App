import express from "express";
import color from "colors";
import dotenv from "dotenv";
const app = express();
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const port = process.env.Port;
app.listen(port, () => {
  console.log(`Server run's in Port ${port}`);
});
app.use("/", (req, res) => {
  res.json({ message: "hellword" });
});
