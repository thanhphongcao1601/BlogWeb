import React, { useState } from "react";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

export function useHome() {
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const [listPost, setListPost] = useState([] as Post[]);
  const [genres, setGenres] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgLink, setImgLink] = useState("");

  function handleGetAllPosts() {
    Posts.getAllPosts()
      .then((response) => {
        const data = response.data;
        setListPost((listPost) => []);
        data.map((post) => setListPost((listPost) => [...listPost, post]));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(onClose: () => void) {
    let newPost: Post = {
      genres: genres ? [genres] : ["other"],
      imgLink: imgLink,
      title: title,
      content: content,
    };
    Posts.addPost(newPost, { authorization: `Bearer ${token}` })
      .then((response) => {
        handleGetAllPosts();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    handleGetAllPosts,
    handleSubmit,
    userName,
    token,
    listPost,
    title,
    content,
    imgLink,
    setGenres,
    setTitle,
    setContent,
    setImgLink,
  };
}
