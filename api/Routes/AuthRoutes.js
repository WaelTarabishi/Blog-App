import express from "express";
const router = express.Router();
import { singup } from "../Controllers/AuthControllers.js";
router.post("/singup", singup);

export default router;
