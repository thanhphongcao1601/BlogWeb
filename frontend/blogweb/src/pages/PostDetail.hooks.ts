import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

export function usePostDetail() {
  const [currentPost, setCurrentPost] = useState({} as Post);
  const [newComment, setNewComment] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  function handleComment() {
    if (!userName) {
      navigate("/login");
      return;
    }

    if (newComment.trim() === "") return setNewComment("");

    Posts.commentPost(
      currentPost._id || "",
      { content: newComment },
      { Authorization: `Bearer ${token}` }
    )
      .then((response) => {
        setNewComment("");
        handleGetPost();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGetPost() {
    Posts.getPost(String(params.postId))
      .then((response) => {
        const data = response.data;
        setCurrentPost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {token,userName,currentPost,setCurrentPost,handleComment,handleGetPost, newComment, setNewComment}
}
