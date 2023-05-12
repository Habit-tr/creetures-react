import { Button, Flex, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { fetchAllRewardsAsync, selectRewards, deleteRewardAsync } from "./allRewardsSlice";
import RewardCard from "./RewardCard";
import { Database } from "../../../utils/supabaseTypes";
import AddReward from "./AddReward";

const Rewards = () => {
  const [rewards, setRewards] = useState<Database['public']['Tables']['rewards']['Row'][]>([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const fetchedRewards = useAppSelector(selectRewards);

  useEffect(() => {
    dispatch(fetchAllRewardsAsync());
    setRewards(fetchedRewards);
  }, [dispatch, fetchedRewards]);

  const handleDeleteReward = (id: number) => {
    dispatch(
      deleteRewardAsync({ id }),
    );
    toast({
      title: "Reward Deleted.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Heading>My Rewards</Heading>
      <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
        Create Reward
      </Button>
      {rewards && rewards.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onDelete={handleDeleteReward}
            />
          ))}
        </Flex>
      ) : null}
      <AddReward isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Rewards;
