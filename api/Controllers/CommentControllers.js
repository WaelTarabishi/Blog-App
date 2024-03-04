import Comment from "../Models/Comment.Model.js";
import { errorHandler } from "../utils/error.js";
const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log({ content, postId, userId });
    if (userId !== req.user.id) {
      next(errorHandler(403, "You are not allowed to create this comment"));
    }
    const comment = await Comment.create({ postId, content, userId });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};
const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
const likeComments = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    console.log(userIndex);
    if (userIndex === -1) {
      comment.numberOfLikes = comment.numberOfLikes + 1;
      comment.likes.push(req.user.id);
      console.log(userIndex);
    } else {
      comment.numberOfLikes = comment.numberOfLikes - 1;
      comment.likes.splice(userIndex, 1);
      console.log(userIndex);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export { createComment, getPostComments, likeComments };
