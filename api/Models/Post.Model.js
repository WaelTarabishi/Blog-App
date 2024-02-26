import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blog-articles-abstract-concept-illustration_335657-4934.jpg?w=740&t=st=1708928640~exp=1708929240~hmac=a23a45bdb70060f7c08f12d657340aaf93d2c18fe7bc9d78c4d0e5911169b645",
    },
    category: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
