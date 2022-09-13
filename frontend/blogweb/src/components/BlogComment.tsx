import { Box, HStack, Image, Text } from "@chakra-ui/react";

interface BlogCommentProps {
  date: Date;
  name: string;
  comment: string;
}

export const BlogComment: React.FC<BlogCommentProps> = (props) => {
  return (
    <HStack alignItems={"flex-start"} mt="10px">
      <Image
        borderRadius="full"
        boxSize="50px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Box w="100%">
        <Text fontWeight="medium">
          {props.name}
        </Text>
        <Text>{props.date.toLocaleDateString()}</Text>
        <Text>{props.comment}</Text>
      </Box>
    </HStack>
  );
};
