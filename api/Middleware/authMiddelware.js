import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/User.Model.js";
import { errorHandler } from "../utils/error.js";
const protect = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

export { protect };
