import Comment from "../Models/Comment.Model.js";
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

export { createComment, getPostComments };
