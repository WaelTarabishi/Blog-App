import express from "express";
import color from "colors";
import dotenv from "dotenv";
const app = express();
import connectDB from "./config/db.js";
import UserRoutes from "./Routes/UserRoutes.js";
import authRoute from "./Routes/AuthRoutes.js";

dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.Port;
app.use("/api/users", UserRoutes);
app.use("/api/auth", authRoute);
app.listen(port, () => {
  console.log(`Server run's in Port ${port}`);
});
