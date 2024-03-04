import express from "express";
const router = express.Router();
import { protect } from "../Middleware/authMiddelware.js";
import {
  createPost,
  getPosts,
  deletePosts,
  updatePost,
} from "../Controllers/PostControllers.js";
router.post("/create", protect, createPost);
router.get("/getposts", getPosts);
router.put("/update/:postId/:userId", protect, updatePost);
router.delete("/deletepost/:postId/:userId", protect, deletePosts);
export default router;
