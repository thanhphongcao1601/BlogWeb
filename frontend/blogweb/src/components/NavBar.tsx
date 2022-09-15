import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  useColorMode,
  useColorModeValue,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { Posts } from "../api/postRequest";
import { Post } from "../models/Post";
import { SearchItem } from "./SearchItem";

export default function NavBar() {
  const userName = localStorage.getItem("userName");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [listSearch, setListSearch] = useState([] as Post[]);

  function handleLogout() {
    localStorage.clear();
    navigate("/login", { replace: true });
  }

  function handleSearch() {
    Posts.searchPost(searchValue)
      .then((response) => {
        const data = response.data;
        setListSearch((listSearch) => []);
        data.map((post) =>
          setListSearch((listSearch) => [...listSearch, post])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      position="fixed"
      zIndex={"1000"}
      top="0px"
      w={"100%"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Link as={ReachLink} to="/">
            <Image
              height={"50px"}
              w="100%"
              src="https://upload.wikimedia.org/wikipedia/vi/0/02/DotBlog_domain_logo.png?20220816010636"
              alt="Dan Abramov"
            />
          </Link>
        </Box>
        <Center>
          <InputGroup position={"absolute"} size="md" w={"50%"}>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              borderRadius="lg"
              border={"2px"}
            />
            <InputRightElement width="4.5rem">
              <Button onClick={handleSearch} h="1.75rem" size="sm">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box top="60px" position="absolute" width={"50%"}>
            {listSearch.map((post) => (
              <SearchItem
                key={post._id}
                postId={post._id || ""}
                imgLink={post.imgLink || ""}
                title={post.title || ""}
                content={post.content || ""}
              />
            ))}
          </Box>
        </Center>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={2}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {userName ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>
                    <Link onClick={handleLogout}>Logout</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : null}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
