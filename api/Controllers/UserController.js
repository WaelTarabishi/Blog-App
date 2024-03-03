import { errorHandler } from "../utils/error.js";
import User from "../Models/User.Model.js";
import asyncHandler from "express-async-handler";

//@desc  update Profile
//route POST /api/user/update/:id
//@access Private
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    // console.log(user);
    console.log(req.body);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.profilePicture = req.body.profilePicture || user.profilePicture;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture, // Fixed variable name
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" }); // Send the response for user not found
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

//@desc  update Profile
//route POST /api/user/delete/:id
//@access Private
const deleteUser = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    next(errorHandler((403, "You are now allowed to delete this user")));
  }
  try {
    await User.findOneAndDelete(req.param._id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    next(err);
  }
});
const getUsers = async (req, res, next) => {
  console.log(req.query);
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }

  try {
    console.log(req.query.startIndex);
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort == "asc" ? 1 : -1;

    const users = await User.find({}, { password: 0 })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json(users, totalUsers, lastMonthUsers);
  } catch (err) {
    next(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" }); // Send the response for user not found
    }
  } catch (err) {
    next(err);
  }
};

export { updateUser, deleteUser, getUsers, getUser };
