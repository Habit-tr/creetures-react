import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout(e: any) {
    e?.preventDefault();
    try {
      await logout();
      await navigate(0);
      await navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Flex p="20px" minH="100px" mb="20px" bgColor="green.200">
      <Link to="/">
        <Heading m="10px">CREETURES</Heading>
      </Link>
      <Link to="/profile">
        <Button m="5px" bgColor="purple.200">
          Profile
        </Button>
      </Link>
      <Link to="/challenges">
        <Button m="5px" bgColor="purple.200">
          Challenges
        </Button>
      </Link>
      <Link to="/">
        <Button m="5px" bgColor="purple.200" onClick={handleLogout}>
          Logout
        </Button>
      </Link>
      <HamburgerMenu />
    </Flex>
  );
};

export default Navbar;
