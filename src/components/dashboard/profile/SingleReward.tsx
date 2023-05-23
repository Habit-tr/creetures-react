import {
  Button,
  Flex,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { fetchSingleRewardAsync, selectReward, editRewardAsync } from "./singleRewardSlice";
import { deleteRewardAsync } from "./allRewardsSlice";
import { EditIcon, ArrowBackIcon } from '@chakra-ui/icons';
import EditReward from "./EditReward";
import DeleteAlert from "./DeleteAlert";
import RedeemButton from "./RedeemButton";

const SingleReward = () => {
  const [reward, setReward] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { urlId } = useParams();
  const fetchedReward = useAppSelector(selectReward);

  useEffect(() => {
    const id = urlId;
    const fetchReward = async () => {
      try {
        await dispatch(fetchSingleRewardAsync({ id }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchReward();
  }, [dispatch, urlId, isOpen]); // need to figure out this dependency array

  useEffect(() => {
    setReward(fetchedReward);
  }, [fetchedReward]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteRewardAsync({ id }));
    isOpen && onClose();
    toast({
      title: "Reward deleted.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    navigate("/rewards");
  };

  const handleBackToRewards = async () => {
    navigate("/rewards");
  }

  const handleRedeem = async () => {
    const rewardToRedeem = {
      id: reward.id,
      times_redeemed: reward.times_redeemed + 1,
    };
    await dispatch(editRewardAsync(rewardToRedeem));
    const updatedReward = { ...reward, times_redeemed: reward.times_redeemed + 1 };
    setReward(updatedReward);
    toast({
      title: "Reward redeemed."
    });
  }

  return (
    <>
      {reward && reward.id && (
        <>
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="blue"
            onClick={() => handleBackToRewards()}
          >
            Rewards
          </Button>
          <Heading>REWARD</Heading>
          {reward.name && (
            <Flex>Name: {reward.name}</Flex>
          )}
          {reward.description && (
            <Flex>Description: {reward.description}</Flex>
          )}
          {reward.times_redeemed !== null && (
            <Flex>Times Redeemed: {reward.times_redeemed}</Flex>
          )}
          {reward.date_last_redeemed && (
            <Flex>Date Last Redeemed: {reward.date_last_redeemed}</Flex>
          )}
          {/* <Button colorScheme="green" width="100px" marginRight="10px"
          onClick={() => handleRedeem()}
          >Redeem</Button> */}
          <RedeemButton id={reward.id} onRedeem={() => handleRedeem()}/>
          <Button
            margin="10px"
            colorScheme="orange"
            onClick={onOpen}
          >
            <EditIcon />
          </Button>
          {/* <Button
            margin="10px"
            colorScheme="red"
            onClick={() => handleDelete(reward.id)}
          >
            <DeleteIcon />
          </Button> */}
          <DeleteAlert onDelete={() => handleDelete(reward.id)}/>
          <EditReward
            isOpen={isOpen}
            onClose={onClose}
            reward={reward}
            setReward={setReward}
          />
        </>
      )}
    </>
  )
}

export default SingleReward;