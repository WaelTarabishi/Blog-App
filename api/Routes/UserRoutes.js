import express from "express";
const router = express.Router();
import { registerhUser } from "../Controllers/UserControllers.js";
router.post("/", registerhUser);

export default router;
