import express from "express";
const router = express.Router();
import {
  createComment,
  getPostComments,
} from "../Controllers/CommentControllers.js";
import { protect } from "../Middleware/authMiddelware.js";
router.post("/createcomment", protect, createComment);
router.get("/getpostcomments/:postId", getPostComments);
export default router;
