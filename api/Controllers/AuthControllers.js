import { errorHandler } from "../utils/error.js";
import User from "../Models/User.Model.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

//@desc Auth user/set token
//route POST /api/auth
//@access Public
const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!username) {
    next(errorHandler(400, "UserName field is empty"));
  }
  if (!email) {
    next(errorHandler(400, "Email field is empty"));
  }
  if (!password) {
    next(errorHandler(400, "Password field is empty"));
  }
  if (userExists) {
    next(errorHandler(400, "User already exist"));
  }
  if (await User.findOne({ username })) {
    next(errorHandler(400, "UserName is used "));
  }

  const user = await User.create({ username, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
    });
  } else {
    next(errorHandler(400, "Invalid Data"));
  }
});

//@desc Auth user/set token
//route POST /api/auth/login
//@access Public
const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    next(errorHandler(400, "Email field is Empty"));
  }
  if (!password) {
    next(errorHandler(400, "Password field is Empty"));
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(202).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      isAdmen: user.isAdmin,
    });
  } else {
    next(errorHandler(400, "User not Found"));
  }
});

//@desc SigninWithGoogle
//route POST /api/auth/google
//@access Public
const signinWithGoogle = asyncHandler(async (req, res, next) => {
  const { name, email, photoUrl } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    generateToken(res, user._id);
  } else {
    const gerneratedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const user = await User.create({
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
      email,
      password: gerneratedPassword,
      profilePicture: photoUrl,
    });
    generateToken(res, user._id);
  }
  res.status(202).json({
    _id: user._id,
    name: user.username,
    email: user.email,
    profilePicture: photoUrl,
    isAdmen: user.isAdmin,
  });
});

//@desc  Log out
//route POST /api/auth/logout
//@access Private
const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

export { signup, signin, logout, signinWithGoogle };
