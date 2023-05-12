import { Card, Text, Button } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
import { Database } from '../../../utils/supabaseTypes';

interface RewardCardProps {
  reward: Database['public']['Tables']['rewards']['Row'];
  onDelete: (id: number) => void;
}

const RewardCard = ({ reward, onDelete }: RewardCardProps) => {
  const handleDelete = () => {
    onDelete(reward.id)
  }
  return (
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
      <Button colorScheme="red" size="sm" onClick={handleDelete}>
        Delete
      </Button>
    </Card>
  );
};

export default RewardCard;