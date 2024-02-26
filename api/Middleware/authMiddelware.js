import jwt from "jsonwebtoken";
import User from "../Models/User.Model.js";
import { errorHandler } from "../utils/error.js";
const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return next(errorHandler(401, "Not authorized, token failed"));
    }
  } else {
    return next(errorHandler(401, "Not authorized, no token"));
  }
};

export { protect };
