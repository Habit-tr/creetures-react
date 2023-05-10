import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  return (
    <Flex p="20px" minH="100px" mb="20px" bgColor="green.200">
      <Link to="/">
        <Heading m="10px">CREETURES</Heading>
      </Link>
      <HamburgerMenu />
    </Flex>
  );
};

export default Navbar;
