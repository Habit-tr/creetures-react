import {
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdRedeem } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { Database } from "../../../utils/supabaseTypes";
import {
  fetchAllEarnedRewardsAsync,
  selectEarnedRewards,
  updateEarnedRewardAsync,
} from "./allEarnedRewardsSlice";

const EarnedRewardsTable = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const earnedRewards = useAppSelector(selectEarnedRewards);
  const { currentUser } = useAuth();
  const [redeeming, setRedeeming] = useState<{ [key: number]: boolean }>({});
  const [unredeemedRewards, setUnredeemedRewards] = useState<
    Database["public"]["Tables"]["earned_rewards"]["Row"][]
  >([]);

  useEffect(() => {
    const fetchEarnedRewards = async () => {
      await dispatch(fetchAllEarnedRewardsAsync(currentUser.id));
    };
    fetchEarnedRewards();
  }, [dispatch, currentUser.id]);

  useEffect(() => {
    const unredeemed = earnedRewards.filter((reward) => !reward.is_redeemed);
    setUnredeemedRewards(unredeemed);
  }, [earnedRewards]);

  const redeemReward = async (rewardId: number) => {
    setRedeeming({ ...redeeming, [rewardId]: true });
    try {
      // dispatch action to update the earned reward as redeemed
      await dispatch(
        updateEarnedRewardAsync({
          id: rewardId,
          is_redeemed: true,
          user_id: currentUser.id,
          date_redeemed: new Date().toISOString(),
        }),
      );

      // filter out the redeemed reward from the list in local state
      const updatedRewards = unredeemedRewards.filter(
        (unredeemedReward) => unredeemedReward.id !== rewardId,
      );

      // update the local state
      setUnredeemedRewards(updatedRewards);
      toast({
        title: "Reward redeemed!",
        duration: 5000,
        isClosable: true,
      });
      await dispatch(fetchAllEarnedRewardsAsync(currentUser.id));
    } catch (error) {
      // handle any errors here, e.g. show a toast message
      toast({
        title: "Error redeeming reward",
        description:
          "There was an error when trying to redeem the reward. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setRedeeming({ ...redeeming, [rewardId]: false });
    }
  };

  return (
    <>
      <Heading>My Earned Rewards</Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Reward Name</Th>
            <Th>Details</Th>
            <Th>Redeem</Th>
          </Tr>
        </Thead>
        <Tbody>
          {unredeemedRewards && unredeemedRewards.length
            ? unredeemedRewards.map((reward) => (
                <Tr key={reward.id}>
                  <Td>{reward.reward.name}</Td>
                  <Td>{reward.reward.description}</Td>
                  <Td>
                    <IconButton
                      aria-label="Redeem"
                      icon={<MdRedeem />}
                      colorScheme="blue"
                      onClick={() => redeemReward(reward.id)}
                      isLoading={redeeming[reward.id]}
                    />
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export default EarnedRewardsTable;
