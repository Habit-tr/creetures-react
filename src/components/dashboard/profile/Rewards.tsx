import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { fetchAllRewardsAsync, selectRewards } from "./allRewardsSlice";
import RewardCard from "./RewardCard";
import { Database } from "../../../utils/supabaseTypes";
import AddReward from "./AddReward";

const Rewards = () => {
  const [rewards, setRewards] = useState<Database['public']['Tables']['rewards']['Row'][]>([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const fetchedRewards = useAppSelector(selectRewards);

  useEffect(() => {
    dispatch(fetchAllRewardsAsync());
    setRewards(fetchedRewards);
  }, [dispatch, fetchedRewards]);


  return (
    <>
      <Heading>My Rewards</Heading>
      <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
        + Create Reward
      </Button>
      {rewards && rewards.length ? (
        <Flex key="reward" direction="row" maxW="900px" wrap="wrap">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
            />
          ))}
        </Flex>
      ) : null}
      <AddReward key="addedReward" isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Rewards;
