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
import { fetchSingleRewardAsync, selectReward } from "./singleRewardSlice";
import { deleteRewardAsync } from "./allRewardsSlice";
import { EditIcon, ArrowBackIcon } from '@chakra-ui/icons';
import EditReward from "./EditReward";
import DeleteAlert from "./DeleteAlert";

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
          {reward.timesRedeemed !== null && (
            <Flex>Times Redeemed: {reward.timesRedeemed}</Flex>
          )}
          {reward.dateLastRedeemed && (
            <Flex>Date Last Redeemed: {reward.dateLastRedeemed}</Flex>
          )}
          <Button bgColor="green.200" width="100px" marginRight="10px">Redeem</Button>
          <Button
            margin="10px"
            bgColor="orange.200"
            onClick={onOpen}
          >
            <EditIcon />
          </Button>
          {/* <Button
            margin="10px"
            bgColor="red.200"
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