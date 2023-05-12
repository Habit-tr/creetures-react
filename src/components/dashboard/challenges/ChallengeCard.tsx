import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Challenge, Database } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
  category: Database["public"]["Tables"]["categories"]["Row"];
}

const ChallengeCard = ({ challenge, category }: ChallengeCardProps) => {
  return (
    <Link to={`/challenges/${challenge.id}`}>
      <Card
        margin="10px"
        w="430px"
        h="150px"
        border="2px black solid"
        bgColor="gray.100"
      >
        <CardBody>
          <Heading mb="0px" size="md">
            {challenge.name?.toUpperCase()}
          </Heading>
          <Text fontSize="sm">Category: {category.name?.toUpperCase()}</Text>
          <Text fontSize="sm">Committed Users: ( ) ( ) ( )</Text>
          {/* <Text fontSize="sm">Success Rate: tbd</Text> */}
        </CardBody>
      </Card>
    </Link>
  );
};
export default ChallengeCard;
