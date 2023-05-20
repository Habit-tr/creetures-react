import { Box, Heading, Text } from "@chakra-ui/react";
import TestStatusCard from "./TestStatusCard";

interface TestChallengeCardProps {
  challengeId: number;
}

const fakeArray = [
  { userId: "ea51ded3-1ebc-4ac6-8089-c3981368a08b", challengeId: 5 },
  { userId: "ea51ded3-1ebc-4ac6-8089-c3981368a08b", challengeId: 5 },
];

const TestChallengeCard = ({ challengeId }: TestChallengeCardProps) => {
  return (
    <Box border="1px black solid" width="75%">
      <Heading>Challenge Name</Heading>
      <Text>ChallengeID: {challengeId}</Text>
      {fakeArray.map((user, i) => (
        <TestStatusCard
          key={i}
          userId={user.userId}
          challengeId={user.challengeId}
        />
      ))}
    </Box>
  );
};
export default TestChallengeCard;
