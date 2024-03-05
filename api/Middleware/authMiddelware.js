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
      // console.log(req.query);
      // console.log(token);
      // console.log(req.user.id);
      // console.log(req.user._id);
      // console.log(token);
      console.log(req.user);
      console.log(req.body);
      console.log(req.query);
      // console.log(req);
      next();
    } catch (error) {
      return next(errorHandler(401, "Not authorized, token failed"));
    }
  } else {
    return next(errorHandler(401, "Not authorized, no token"));
  }
};

export { protect };
