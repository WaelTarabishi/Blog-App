import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  logout,
  signinWithGoogle,
} from "../Controllers/AuthControllers.js";
router.post("/", signup);
router.post("/login", signin);
router.post("/logout", logout);
router.post("/google", signinWithGoogle);

export default router;
