const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    imgLink: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    genre: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
