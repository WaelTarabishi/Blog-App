import express from "express";
const router = express.Router();
import { singup } from "../Controllers/AuthControllers.js";
router.post("/", singup);

export default router;
