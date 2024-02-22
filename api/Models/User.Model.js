import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Favatar%2F&psig=AOvVaw0kxMbsRHh6SxSRLfHJwNt_&ust=1708701312016000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCiqeGrv4QDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPasswords = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
