import { Box, Heading } from "@chakra-ui/react";
import ChallengeBuddiesCard from "./ChallengeBuddiesCard";

const fakeArray = [{ challengeId: 5 }, { challengeId: 5 }];

const TestFriendsSidebar = () => {
  return (
    <Box border="1px black solid">
      <Heading>Friends Sidebar</Heading>
      {fakeArray.map((user, i) => (
        <ChallengeBuddiesCard key={i} challengeId={user.challengeId} />
      ))}
    </Box>
  );
};
export default TestFriendsSidebar;
