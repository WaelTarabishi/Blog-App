import User from "../Models/User.Model.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
const registerhUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
});

export { registerhUser };
