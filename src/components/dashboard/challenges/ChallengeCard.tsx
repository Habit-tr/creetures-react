import { Card, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Challenge } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Card border="1px black solid" w="150px" h="150px">
      <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
        <Text>{challenge.name}</Text>
      </Link>
    </Card>
  );
};
export default ChallengeCard;
