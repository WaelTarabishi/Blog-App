import express from "express";
const router = express.Router();
import { protect } from "../Middleware/authMiddelware.js";
import {
  createPost,
  getPosts,
  deletePosts,
} from "../Controllers/PostControllers.js";
router.post("/create", protect, createPost);
router.get("/getposts", protect, getPosts);
router.delete("/deletepost/:postId/:userId", protect, deletePosts);
export default router;
