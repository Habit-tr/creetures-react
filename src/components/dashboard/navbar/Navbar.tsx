import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Center, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { session } = useAuth();
  const user = session.session.user;
  async function handleLogout(e: any) {
    e?.preventDefault();
    try {
      await logout();
      await navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      p="20px"
      minH="100px"
      mb="20px"
      bgColor="black"
      justifyContent="space-between"
    >
      <Link to="/">
        <Heading fontSize="32px" m="10px" color="green.200">
          CREETURES
        </Heading>
      </Link>
      <HamburgerMenu />
      <Button m="5px" onClick={() => toggleColorMode()} bgColor="green.200">
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Flex
        flexDirection="column"
        cursor="pointer"
        onClick={() => navigate("/profile")}
      >
        <Center color="white">Logged in as:</Center>{" "}
        <Center color="white">{user.email}</Center>
      </Flex>
      <Link to="/">
        <Button m="5px" bgColor="green.200" onClick={handleLogout}>
          Logout
        </Button>
      </Link>
    </Flex>
  );
};

export default Navbar;
