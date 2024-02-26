//@desc  Create a post
//route POST /api/post/create
//@access Private(Only Admin)
import { errorHandler } from "../utils/error.js";
import Post from "../Models/Post.Model.js";
const createPost = async (req, res, next) => {
  const { title } = req.body;

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a Post"));
  }

  const postTitleExist = await Post.findOne({ title });

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  if (postTitleExist) {
    return next(errorHandler(403, "This Title is Exist"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");

  const post = await Post.create({ ...req.body, userId: req.user._id, slug });

  if (post) {
    res.status(200).json({
      userId: post.userId,
      image: post.image,
      title: post.title,
      content: post.content,
      slug: post.slug,
      category: post.category,
    });
  } else {
    next(errorHandler(400, "Invalid Data"));
  }
};

export { createPost };
