import express from "express";
import color from "colors";
import dotenv from "dotenv";
const app = express();
import connectDB from "./config/db.js";
import authRoute from "./Routes/AuthRoutes.js";
import UserRoute from "./Routes/UserRoutes.js";
import PostRoute from "./Routes/PostRoutes.js";
import CommentRoute from "./Routes/CommentRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
connectDB();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.Port;
app.listen(port, () => {
  console.log(`Server run's in Port ${port}`);
});
app.use("/api/auth", authRoute);
app.use("/api/user", UserRoute);
app.use("/api/post", PostRoute);
app.use("/api/comment", CommentRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
