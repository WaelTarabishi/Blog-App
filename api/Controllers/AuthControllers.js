import User from "../Models/User.Model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
const singup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(500, "All fields are required"));
  } else {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.json({ message: "user Register" });
    } catch (err) {
      next(err);
    }
  }
};

export { singup };
