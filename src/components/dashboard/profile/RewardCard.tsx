import { Card, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Database } from '../../../utils/supabaseTypes';
import { DeleteIcon } from '@chakra-ui/icons';

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
      <Flex justify="space-between" align="center">
        <Link to={`/rewards/${reward.id}`}>
          <Button colorScheme="blue" size="sm" mt={2}>
            View
          </Button>
        </Link>
        <Button colorScheme="red" size="sm" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </Flex>
    </Card>
  );
};

export default RewardCard;