import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Challenge } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Link to={`/challenges/${challenge.id}`}>
      <Card margin="10px" w="430px" border="2px black solid" bgColor="gray.100">
        <CardBody>
          <Heading mb="0px" size="md">
            {challenge.name?.toUpperCase()}
          </Heading>
          <Text fontSize="sm">CATEGORY ID: {challenge.category_id}</Text>
          <Text fontSize="sm">COMMITTED USERS:</Text>
          <Text fontSize="sm">LIKES / SUCCESS RATE:</Text>
        </CardBody>
      </Card>
    </Link>
  );
};
export default ChallengeCard;
