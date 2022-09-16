const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");

const {
  getAllPosts,
  createOnePost,
  updateOnePost,
  deleteOnePost,
  getOnePost,
  commentPost,
  searchPost,
  filterPost,
} = require("../controllers/postController.js");

const Router = express.Router();

Router.route("/").get(getAllPosts).post(verifyToken, createOnePost);

Router.route("/:postId")
  .get(getOnePost)
  .put(verifyToken, updateOnePost)
  .patch(verifyToken, commentPost)
  .delete(verifyToken, deleteOnePost);

Router.route("/search").post(searchPost);
Router.route("/filter").post(filterPost);

module.exports = Router;
