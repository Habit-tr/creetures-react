import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import AddChallenge from "./AddChallenge";

const AllChallenges = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Heading>All Challenges</Heading>
      <Text>Render Challenges Here</Text>
      <Button bgColor="purple.200" onClick={onOpen}>
        Create Challenge
      </Button>
      <AddChallenge isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AllChallenges;
