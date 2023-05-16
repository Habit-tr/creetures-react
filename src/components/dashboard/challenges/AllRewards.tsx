import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import {
  fetchAllRewardsAsync,
  selectRewards,
} from "../profile/allRewardsSlice";

const AllRewards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllRewardsAsync());
  }, [dispatch]);

  const rewards = useAppSelector(selectRewards);

  return (
    <>
      <Heading>My Rewards</Heading>
      {rewards && rewards.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {rewards.map((reward) => (
            <>
              <pre>{JSON.stringify(reward, null, 2)}</pre>;
              <Button bgColor="purple.200" onClick={onOpen}>
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
