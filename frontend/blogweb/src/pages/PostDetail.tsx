import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Container,
  HStack,
  Textarea,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { PostAuthor } from "../components/PostAuthor";
import { PostComment } from "../components/PostComment";
import PostTags from "../components/PostTags";
import { Post } from "../models/Post";

export default function PostDetail() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const [currentPost, setCurrentPost] = useState({} as Post);
  const [newComment, setNewComment] = useState("");
  const params = useParams();

  function handleComment() {
    if (!userName) return;

    setNewComment("");

    Posts.updatePost(
      currentPost._id || "",
      { content: newComment },
      { Authorization: `Bearer ${token}` }
    )
      .then((response) => {
        const data = response.data;
        console.log(data);
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
        console.log(data);

        setCurrentPost((currentPost) => data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleGetPost();
  }, []);

  return (
    <Container maxW={"7xl"} p="12" mt={"40px"}>
      <Box w="100%">
        <Box marginX={"50px"} borderRadius="lg" overflow="hidden">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Image
              width={"100%"}
              fallbackSrc="https://via.placeholder.com/1200x300?text=No+Image"
              transform="scale(1.0)"
              src={currentPost.imgLink || ""}
              alt="no image"
              objectFit="cover"
              transition="0.3s ease-in-out"
            />
          </Link>
        </Box>
        <PostAuthor
          name={currentPost.author?.name || ""}
          date={new Date(currentPost.createdAt || "")}
        />
        <PostTags
          tags={
            currentPost.genres?.length > 0
              ? [...currentPost.genres]
              : ["unknow"]
          }
          marginTop="3"
        />
        <Heading fontSize="xl" marginTop="2">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            {currentPost.title || "No title"}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {currentPost.content || "ddddd"}
        </Text>
        <HStack alignItems={"flex-start"} mt="30px">
          <Image
            borderRadius="full"
            boxSize="50px"
            src="https://avatars.dicebear.com/api/male/username.svg"
            alt={`Avatar`}
          />
          <Box w="100%">
            <Textarea
              readOnly={userName ? false : true}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your comment"
            ></Textarea>
            <Flex>
              <Spacer />
              <Button
                onClick={handleComment}
                alignSelf={"end"}
                mt={"5px"}
                justifyContent="right"
              >
                Comment
              </Button>
            </Flex>
          </Box>
        </HStack>
        {currentPost.comments?.map((comment) => (
          <PostComment
            key={comment._id}
            name={comment.author?.name}
            date={new Date(comment.createdAt)}
            comment={comment.content}
          />
        ))}
      </Box>
    </Container>
  );
}
