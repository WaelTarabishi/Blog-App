import express from "express";
const router = express.Router();
import { protect } from "../Middleware/authMiddelware.js";
import { createPost } from "../Controllers/PostControllers.js";
router.post("/create", protect, createPost);
export default router;
