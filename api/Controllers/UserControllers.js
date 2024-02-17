import User from "../Models/User.Model.js";
const registerhUser = async (req, res) => {
  const { username, email, password } = req.body;
  res.json({ message: "helj" });
};

export { registerhUser };
