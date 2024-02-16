import express from "express";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      requried: true,
      unique: true,
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
