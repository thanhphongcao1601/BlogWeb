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
  Link
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom"

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <InputGroup size="md" mx="10px" w={"50%"}>
          <Input placeholder="search blog" borderRadius="lg" border={"2px"} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={2}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
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
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>
                  <Link as={ReachLink} to="/login">Logout</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
