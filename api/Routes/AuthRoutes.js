import express from "express";
const router = express.Router();
import { signup, signin, logout } from "../Controllers/AuthControllers.js";
router.post("/", signup);
router.post("/login", signin);
router.post("/logout", logout);

export default router;
