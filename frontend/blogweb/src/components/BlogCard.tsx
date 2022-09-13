import { Box, Link, WrapItem, Image, Heading, Text } from "@chakra-ui/react";
import { BlogAuthor } from "./BlogAuthor";
import BlogTags from "./BlogTags";

interface BlogCardProps {
  imgLink: string;
  title: string;
  content: string;
  genre: Array<string>;
  author: string;
  date: Date;
}

export const BlogCard: React.FC<BlogCardProps> = (props) => {
  return (
    <WrapItem width={{ base: "100%", sm: "100%", md: "45%", lg: "30%" }}>
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Image
              transform="scale(1.0)"
              src={props.imgLink}
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
        <BlogTags tags={props.genre} marginTop="3" />
        <Heading fontSize="xl" marginTop="2">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            {props.title}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {props.content}
        </Text>
        <BlogAuthor name={props.author} date={props.date} />
      </Box>
    </WrapItem>
  );
};
