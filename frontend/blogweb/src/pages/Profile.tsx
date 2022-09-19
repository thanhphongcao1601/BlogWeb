import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Container,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Posts } from "../api/postRequest";
import { PostCard } from "../components/PostCard";
import { Post } from "../models/Post";

export default function Profile() {
  const email = localStorage.getItem("email");
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId") ?? "";
  const [listUserPost, setListUserPost] = useState([] as Post[]);

  function getPostByAuthorId() {
    Posts.getPostByAuthorId(userId)
      .then((response) => {
        const data = response.data;
        setListUserPost((listUserPost) => []);
        data.map((post) =>
          setListUserPost((listUserPost) => [...listUserPost, post])
        );
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPostByAuthorId();
  }, []);
  return (
    <Container maxW={"7xl"} bg={"tomato"} p={0}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"240px"}
          w={"100%"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box pt={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {userName}
            </Heading>
            <Text color={"gray.500"}>{email}</Text>
          </Stack>
        </Box>
        {listUserPost.length > 0 ? (
          <Wrap px={6} spacing="30px" marginTop="5">
            {listUserPost.reverse().map((post) => (
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
          </Wrap>
        ) : (
          <Center
          py={10}>
            <Text fontSize={"xl"}>You have no post</Text>
          </Center>
        )}
      </Box>
    </Container>
  );
}
