import { Card, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Challenge } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Link to={`/challenges/${challenge.id}`}>
      <Card
        margin="10px"
        padding="10px"
        w="150px"
        h="150px"
        bgColor="orange.200"
        justify="center"
      >
        <Text fontSize="20px" align="center">
          {challenge.name}
        </Text>
        <Text fontSize="10px" align="center">
          category-name-goes-here
        </Text>
      </Card>
    </Link>
  );
};
export default ChallengeCard;
