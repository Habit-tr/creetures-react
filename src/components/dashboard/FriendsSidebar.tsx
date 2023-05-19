import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Reaction from "./profile/AllReactions";

const FriendsSidebar = () => {
  const navigate = useNavigate();
  return (
    <Box
      w="275px"
      h="440px"
      border="2px black solid"
      margin="20px"
      padding="10px"
    >
      <Heading
        size="md"
        mb="20px"
        color="purple.500"
        cursor="pointer"
        onClick={() => navigate("/friends")}
      >
        FELLOW CREETURES
      </Heading>
      <Text mb="10px">
        Sort top friends by # of shared challenges commited to. Show avatar,
        most recent check-in, highfives and nudges.
      </Text>
      <Text mb="10px">Andrew nudged Ben!</Text>
      <Text mb="10px">Jack high-fived Simin!</Text>
      <Text mb="10px">Danny committed to a new challenge!</Text>
      <Reaction />
    </Box>
  );
};
export default FriendsSidebar;
