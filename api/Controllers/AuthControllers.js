import User from "../Models/User.Model.js";
import bcryptjs from "bcryptjs";
import {} from "module";
const singup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(400).json({ message: "All fields are required" });
  }
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
    res.status(501).json({ message: "already exists" });
  }
};

export { singup };
