import { errorHandler } from "../utils/error.js";
import User from "../Models/User.Model.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

//@desc Auth user/set token
//route POST /api/auth
//@access Public
const singup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!username || !email || !password) {
    next(errorHandler(500, "Fill all fields"));
  }
  if (userExists) {
    next(errorHandler(400, "User already exist"));
  }
  const user = await User.create({ username, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } else {
    next(errorHandler(400, "Invalid Data"));
  }
});

export { singup };
