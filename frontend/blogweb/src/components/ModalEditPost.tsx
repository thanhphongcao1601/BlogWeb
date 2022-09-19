import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { usePostDetail } from "../pages/PostDetail.hooks";

interface UserDisclosureProps {
  currentPost: Post;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalEditPost: React.FC<UserDisclosureProps> = (props) => {
  const token = localStorage.getItem("token");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [genres, setGenres] = useState([] as string[]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgLink, setImgLink] = useState("");
  const navigate = useNavigate();

  function initCurrentValue() {
    setGenres(props.currentPost.genres ?? []);
    setTitle(props.currentPost.title);
    setContent(props.currentPost.content);
    setImgLink(props.currentPost.imgLink ?? "");
  }

  function handleDeletePost() {
    Posts.deletePost(props.currentPost._id ?? "", {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditPost(onClose: () => void) {
    let newPost: Post = {
      genres: genres?.at(0) ? genres : ["other"],
      imgLink: imgLink,
      title: title,
      content: content,
    };

    Posts.updatePost(
      props.currentPost._id!,
      { ...newPost },
      { Authorization: `Bearer ${token}` }
    )
      .then((response) => {
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (props.currentPost._id !== undefined) {
      initCurrentValue();
    }
  }, [props.currentPost._id]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Genres</FormLabel>
            <Select
              value={genres?.at(0) ?? "other"}
              placeholder="Other"
              onChange={(e) => {
                setGenres([e.target.value]);
              }}
            >
              <option value="education">Education</option>
              <option value="technology">Technology</option>
              <option value="sport">Sport</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={initialRef}
              placeholder="Title"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              isRequired
              placeholder="Content"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image link</FormLabel>
            <Input
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
              placeholder="Image link"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="tomato"
            onClick={() => handleDeletePost()}
            colorScheme="red"
            mr={3}
          >
            Delete
          </Button>
          <Button
            onClick={() => handleEditPost(props.onClose)}
            colorScheme="blue"
            mr={3}
          >
            Save
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
