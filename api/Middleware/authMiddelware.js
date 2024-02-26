import jwt from "jsonwebtoken";
import User from "../Models/User.Model.js";
import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/error.js";
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
