import { Card, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Challenge } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
      <Card key={challenge.id} border="1px black solid" w="150px" h="150px">
        <Text>{challenge.name}</Text>
      </Card>
    </Link>
  );
};
export default ChallengeCard;
