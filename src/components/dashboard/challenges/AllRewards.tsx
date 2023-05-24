import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import {
  fetchAllRewardsAsync,
  selectRewards,
} from "../profile/allRewardsSlice";

import MyReward from "../components/MyReward";

const AllRewards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllRewardsAsync());
  }, [dispatch]);

  const rewards = useAppSelector(selectRewards);

  return (
    <>

      <Heading pl='10px'>My Rewards</Heading>

      {rewards && rewards.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {rewards.map((reward) => (
            <>
              <Button colorScheme="purple" onClick={onOpen}>
                <Link to={`/reward/${reward.id}`}>View reward</Link>
              </Button>
            </>
          ))}
        </Flex>
      ) : null}
    </>
  );
};

export default AllRewards;
