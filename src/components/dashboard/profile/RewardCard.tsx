import { Card, Text, CardBody, Heading, Divider, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Database } from '../../../utils/supabaseTypes';
import { useAppDispatch } from "../../../utils/reduxHooks";
import { editRewardAsync } from "./singleRewardSlice";
import RedeemButton from "./RedeemButton";

interface RewardCardProps {
  reward: Database['public']['Tables']['rewards']['Row'];
}

const RewardCard = ({ reward }: RewardCardProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleRedeem = async () => {
    if (reward.times_redeemed !== null) {
      const rewardToRedeem = {
        id: reward.id,
        times_redeemed: reward.times_redeemed + 1,
      };
      await dispatch(editRewardAsync(rewardToRedeem));
      toast({
        title: "Reward redeemed."
      })
    }
  }

  return (
    <Link to={`/rewards/${reward.id}`}>
      <Card
        margin="10px"
        w="430px"
        h="175px"
        border="2px black solid"
        color="black"
        bgGradient="linear(to-b, gray.100, gray.300)"
      >
        <CardBody>
          <Heading mb="0px" size="md">
            REWARD
          </Heading>
          <Text fontSize="md">Name: {reward.name}</Text>
          <Text fontSize="sm">Description: {reward.description}</Text>
        </CardBody>
        <Divider />
        {/* <Button bgColor="green.200" width="100px" m="10px">Redeem</Button> */}
        <RedeemButton key="redeemButton" id={reward.id} onRedeem={() => handleRedeem()}/>
      </Card>
    </Link>
  );
};

export default RewardCard;