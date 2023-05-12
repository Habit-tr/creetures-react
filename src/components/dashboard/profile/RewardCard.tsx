import { Card, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Database } from '../../../utils/supabaseTypes';

interface RewardCardProps {
  reward: Database['public']['Tables']['rewards']['Row'];
}

const RewardCard = ({ reward }: RewardCardProps) => {
  return (
    <Link to={`/rewards/${reward.id}`}>
      <Card
        margin="10px"
        padding="10px"
        w="150px"
        h="150px"
        bgColor="orange.200"
        justify="center"
      >
        <Text fontSize="20px" align="center">
          {reward.name}
        </Text>
        <Text fontSize="10px" align="center">
          {reward.description}
        </Text>
      </Card>
    </Link>
  );
};

export default RewardCard;