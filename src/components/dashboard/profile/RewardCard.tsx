import { Card, Text, CardBody, Heading, Button, Divider } from "@chakra-ui/react";
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
        w="475px"
        h="175px"
        border="2px black solid"
        bgColor="gray.100"
      >
        <CardBody>
          <Heading mb="0px" size="md">
            REWARD
          </Heading>
          <Text fontSize="md">Name: {reward.name}</Text>
          <Text fontSize="sm">Description: {reward.description}</Text>
        </CardBody>
        <Divider />
        <Button bgColor="green.200" width="100px" m="10px">Redeem</Button>
      </Card>
    </Link>
  );
};

export default RewardCard;