import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";

export function useHome() {
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");
  const [listPost, setListPost] = useState([] as Post[]);
  const [genres, setGenres] = useState([] as string[]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgLink, setImgLink] = useState("");

  useEffect(()=>{
    console.log('useeffect',listPost);
  },[listPost])

  function handleGetAllPosts() {
    console.log("handleGetAll");
    Posts.getAllPosts()
      .then(async (response) => {
        const data = await response.data;
        console.log(data)
        setListPost([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleSubmit(onClose: () => void) {
    console.log("handle submit")
    let newPost: Post = {
      genres: genres.length > 0 ? genres : ["other"],
      imgLink: imgLink,
      title: title,
      content: content,
    };
    const check = await Posts.addPost(newPost,{ authorization: `Bearer ${token}`})
    const checkdata = await (await Posts.getAllPosts()).data;

    setListPost([...checkdata]);


    // await Posts.addPost(newPost, { authorization: `Bearer ${token}` })
    //   .then((response) => {
    //     handleGetAllPosts();
    //     //window.location.reload();
    //     onClose();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
    genres,
    setGenres,
    setTitle,
    setContent,
    setImgLink,
  };
}
