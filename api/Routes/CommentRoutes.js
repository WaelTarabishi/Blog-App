import express from "express";
const router = express.Router();
import {
  createComment,
  getPostComments,
  likeComments,
  editComments,
  deleteComments,
  getAllComments,
  getusercomments,
} from "../Controllers/CommentControllers.js";
import { protect } from "../Middleware/authMiddelware.js";
router.post("/createcomment", protect, createComment);
router.get("/getpostcomments/:postId", getPostComments);
router.put("/like/:commentId", protect, likeComments);
router.put("/editcomment/:commentId", protect, editComments);
router.delete("/deletecomment/:commentId", protect, deleteComments);
router.get("/getallcomments", protect, getAllComments);
router.get("/`getusercomments`/:userId", getusercomments);
export default router;
