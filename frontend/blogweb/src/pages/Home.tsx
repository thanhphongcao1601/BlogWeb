import {
  Heading,
  Divider,
  Wrap,
  Container,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import { PostCard } from "../components/PostCard";
import { useEffect } from "react";
import { useHome } from "./Home.hooks";
import { ModalCreatePost } from "../components/ModalCreatePost";

function Home() {
  const { handleGetAllPosts, userName, listPost } = useHome();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    handleGetAllPosts();
  });

  return (
    <>
      <ModalCreatePost isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
          {listPost
            .slice(0)
            .reverse()
            .map((post) => (
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
