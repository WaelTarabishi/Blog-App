import express from "express";
const router = express.Router();
import { updateUser, deleteUser } from "../Controllers/UserController.js";
import { protect } from "../Middleware/authMiddelware.js";

router.put("/update/:_id", protect, updateUser);
router.delete("/delete/:_id", protect, deleteUser);
export default router;
