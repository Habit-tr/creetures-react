import {
  Button,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { fetchSingleRewardAsync, selectReward } from "./singleRewardSlice";
import { EditIcon } from '@chakra-ui/icons';
import EditReward from "./EditReward";

const SingleReward = () => {
  const [reward, setReward] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
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

  return (
    <>
      {reward && reward.id && (
        <>
          <Heading>{reward.name}</Heading>
          {reward.description && (
            <Flex>Description: {reward.description}</Flex>
          )}
          <Button margin="10px" bgColor="orange.200" onClick={onOpen}>
            <EditIcon />
          </Button>
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