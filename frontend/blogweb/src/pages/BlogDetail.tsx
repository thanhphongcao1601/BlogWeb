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
import { BlogAuthor } from "../components/BlogAuthor";
import { BlogComment } from "../components/BlogComment";
import BlogTags from "../components/BlogTags";

export default function BlogDetail() {
  return (
    <Container maxW={"7xl"} p="12" mt={"40px"}>
      <Box w="100%">
        <Box maxHeight={"300px"} borderRadius="lg" overflow="hidden">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Image
              transform="scale(1.0)"
              src={
                "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
              }
              alt="some text"
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Link>
        </Box>
        <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
        <BlogTags tags={["Engineering", "Product"]} marginTop="3" />
        <Heading fontSize="xl" marginTop="2">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            Some blog title
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <HStack alignItems={"flex-start"} mt="30px">
          <Image
            borderRadius="full"
            boxSize="50px"
            src="https://100k-faces.glitch.me/random-image"
            alt={`Avatar`}
          />
          <Box w="100%">
            <Textarea placeholder="Enter your comment"></Textarea>
            <Flex>
              <Spacer />
              <Button alignSelf={"end"} mt={"5px"} justifyContent="right">
                Comment
              </Button>
            </Flex>
          </Box>
        </HStack>
        <BlogComment
          name="John Doe"
          date={new Date("2021-04-06T19:01:27Z")}
          comment="sdfsdfsdfsdfssf Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took"
        />
        <BlogComment
          name="John Doe"
          date={new Date("2021-04-06T19:01:27Z")}
          comment="sdandard dummy text ever
          since the 1500s, when an unknown printer took"
        />
        <BlogComment
          name="John Doe"
          date={new Date("2021-04-06T19:01:27Z")}
          comment="sdfsdfsdfsdfssf Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took"
        />
      </Box>
    </Container>
  );
}
