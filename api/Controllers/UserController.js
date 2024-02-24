import { errorHandler } from "../utils/error.js";
import User from "../Models/User.Model.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

//@desc  update Profile
//route POST /api/user/update/:id
//@access Private
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
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
  if (req.user.id !== req.params._id) {
    next(errorHandler((403, "You are now allowed to delete this user")));
  }
  try {
    await User.findOneAndDelete(req.param.id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    next(err);
  }
});

export { updateUser, deleteUser };
