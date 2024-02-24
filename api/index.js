import express from "express";
import color from "colors";
import dotenv from "dotenv";
const app = express();
import connectDB from "./config/db.js";
import authRoute from "./Routes/AuthRoutes.js";
import UserRoute from "./Routes/UserRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.Port;
app.listen(port, () => {
  console.log(`Server run's in Port ${port}`);
});
app.use("/api/auth", authRoute);
app.use("/api/user", UserRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
