import {
  Heading,
  Divider,
  Wrap,
  Container,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
  Select,
} from "@chakra-ui/react";

import { PostCard } from "../components/PostCard";
import { Posts } from "../api/postRequest";
import { useEffect, useState } from "react";
import { Post } from "../models/Post";
import React from "react";

function Home() {
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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

  function handleSubmit() {
    let newpost: Post = {
      genres: genres ? [genres] : ["other"],
      imgLink: imgLink,
      title: title,
      content: content,
    };
    Posts.addPost(newpost, { authorization: `Bearer ${token}` })
      .then((response) => {
        onClose();
        handleGetAllPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleGetAllPosts();
  }, []);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Genres</FormLabel>
              <Select
                placeholder="Other"
                onChange={(e) => {
                  setGenres(e.target.value);
                  console.log(e.target.value);
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
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW={"7xl"} p="12" mt={"40px"}>
        <Flex justifyContent={"space-between"}>
          <Heading as="h2">Latest</Heading>
          {userName ? (
            <Button border={"2px"} borderColor={"green.100"} onClick={onOpen}>
              Add Post
            </Button>
          ) : null}
        </Flex>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          {listPost.reverse().map((post) => (
            <PostCard
              postId={post._id || ""}
              key={post._id}
              imgLink={post.imgLink || ""}
              title={post.title || "No title"}
              content={post.content || ""}
              genres={post.genres.length > 0 ? [...post.genres] : ["unknow"]}
              author={post.author?.name || ""}
              date={new Date(post.createdAt || "")}
            />
          ))}
          <PostCard
            postId={"111"}
            imgLink={
              "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            }
            title={"TEST UI"}
            content={
              "Đây là widget hầu như có mặt trong tất cả các app lớn nhỏ. Nó cung cấp cho chúng ta rất nhiều thuộc tính rất thông dụng, từ việc thêm màu background(color), hình dạng, margin, padding, kích thước (width, height) cho đến việc sắp xếp, định vị, trang trí cho widget mà nó bao bọc. Nó còn rất linh hoạt trong việc kết hợp với các widget khác để tạo ra"
            }
            genres={["Technology"]}
            author={"Phong Cao"}
            date={new Date()}
          />
        </Wrap>
      </Container>
    </>
  );
}

export default Home;
