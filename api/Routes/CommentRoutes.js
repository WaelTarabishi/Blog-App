import express from "express";
const router = express.Router();
import {
  createComment,
  getPostComments,
  likeComments,
} from "../Controllers/CommentControllers.js";
import { protect } from "../Middleware/authMiddelware.js";
router.post("/createcomment", protect, createComment);
router.get("/getpostcomments/:postId", getPostComments);
router.put("/like/:commentId", protect, likeComments);
export default router;
