import express from "express";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getUsers,
} from "../Controllers/UserController.js";
import { protect } from "../Middleware/authMiddelware.js";

router.put("/update/:_id", protect, updateUser);
router.delete("/delete/:_id/:userId", protect, deleteUser);
router.get("/getusers", protect, getUsers);
export default router;
