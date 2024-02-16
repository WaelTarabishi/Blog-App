import express from "express";
import color from "colors";
import dotenv from "dotenv";
const app = express();
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
app.listen(3000, () => {
  console.log("runnign in server 3000");
});
