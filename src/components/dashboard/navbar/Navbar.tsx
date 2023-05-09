import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex p="20px" minH="100px" mb="20px" bgColor="green.200">
      <Heading m="10px">CREETURES</Heading>
      <Link to="/">
        <Button m="5px" bgColor="purple.200">
          Home
        </Button>
      </Link>{" "}
      <Link to="/challenges">
        <Button m="5px" bgColor="purple.200">
          Challenges
        </Button>
      </Link>{" "}
      <Link to="/profile">
        <Button m="5px" bgColor="purple.200">
          Profile
        </Button>
      </Link>{" "}
      <Button m="5px" bgColor="purple.200">
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;
