import express from "express";
const router = express.Router();
import { createComment } from "../Controllers/CommentControllers.js";
import { protect } from "../Middleware/authMiddelware.js";
router.post("/createcomment", protect, createComment);
export default router;
