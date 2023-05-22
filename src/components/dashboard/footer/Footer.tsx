import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      display="flex"
      width="100%"
      p="20px"
      minH="50px"
      mt="auto"
      bgColor="black"
      justifyContent="space-between"
      color="green.200"
    >
      <Flex width="50%" justify="space-between">
        <Text>Ben</Text> <Text>Simin</Text> <Text>Danny</Text>{" "}
        <Text>Andrew</Text> <Text>Jack</Text>
      </Flex>
      <Flex width="20%"></Flex>
      <Flex width="30%" justify="space-between">
        <Text>Fullstack Academy</Text>
        <Text>May 2023</Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
