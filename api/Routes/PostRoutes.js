import express from "express";
const router = express.Router();
import { protect } from "../Middleware/authMiddelware.js";
import { createPost, getPosts } from "../Controllers/PostControllers.js";
router.post("/create", protect, createPost);
router.get("/getposts", getPosts);
export default router;
