import express from "express";
const router = express.Router();
import { updateUser } from "../Controllers/UserControllers.js";
import { protect } from "../Middleware/authMiddelware.js";

router.put("/update/:userId", protect, updateUser);
export default router;
