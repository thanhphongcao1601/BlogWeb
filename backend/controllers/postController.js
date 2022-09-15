const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" },
      });
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.createOnePost = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const post = await Post.create({ ...req.body, author: userId });
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByIdAndUpdate(
      postId,
      { ...req.body },
      { new: true, runValidator: true }
    );
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.commentPost = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const comment = await Comment.create({ ...req.body, author: userId });
    console.log(req.body);
    console.log(comment);
    console.log(comment._id);
    const { postId } = req.params;

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true, runValidator: true }
    );
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      status: "success",
      message: "Post has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "author", select: "name" },
    });

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.searchPost = async (req, res, next) => {
  const { title } = req.body;
  console.log(title);
  try {
    const posts = await Post.find({ title: { $regex: title } })
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" },
      });
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (error) {
    res.json(error);
  }
};
