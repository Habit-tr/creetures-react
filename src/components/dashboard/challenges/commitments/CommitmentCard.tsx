import { Card, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Database } from "../../../../utils/supabaseTypes";

interface CommitmentCardProps {
  commitment: Database['public']['Tables']['commitments']['Row'];
}

const CommitmentCard = ({ commitment }: CommitmentCardProps) => {
  const { badgeLevel, challenge, isUpToDate } = commitment;

  return (
    <Link to={`/commitments/${commitment.id}`}>
      <Card
        margin="10px"
        padding="10px"
        w="150px"
        h="150px"
        bgColor="blue.200"
        justify="center"
      >
        <Text fontSize="20px" align="center">
          {challenge.name}
        </Text>
        <Text fontSize="10px" align="center">
          Badge level: {badgeLevel}
        </Text>
        {isUpToDate
        ? <Text fontSize="10px" fontWeight="bold" color="white" align="center">
            Up to date
          </Text>
        : <Text fontSize="10px" fontWeight="bold" color="red" align="center">
            Behind
          </Text>
        }
      </Card>
    </Link>
  );
};

export default CommitmentCard;
