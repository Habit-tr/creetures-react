import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Challenge, Database } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
  user: any;
  category: Database["public"]["Tables"]["categories"]["Row"];
}

const ChallengeCard = ({ user, challenge, category }: ChallengeCardProps) => {
  return (
    <Link to={`/challenges/${challenge.id}`}>
      <Card
        margin="10px"
        w="430px"
        h="175px"
        border="2px black solid"
        bgColor="gray.100"
      >
        <CardBody>
          <Heading mb="0px" size="md">
            {challenge.name?.toUpperCase()}
          </Heading>

          <Text fontSize="sm">Description: {challenge.description}</Text>
          <Text fontSize="sm">Category: {category.name?.toUpperCase()}</Text>
          <Text fontSize="sm">Committed Users: ( ) ( ) ( )</Text>
          {/* <Text fontSize="sm">Success Rate: tbd</Text> */}
          {/* don't show commitment button if already committed? make it say view Commitment? */}
          <Button m="10px" bgColor="green.200">
            Commit
          </Button>
          {user.id === challenge.created_by && (
            <>
              <Button m="10px" bgColor="orange.200">
                <EditIcon />
              </Button>
              <Button m="10px" bgColor="red.200">
                <DeleteIcon />
              </Button>
            </>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};
export default ChallengeCard;
