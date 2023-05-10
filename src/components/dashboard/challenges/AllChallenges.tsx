import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { Challenge } from "../../../utils/supabaseTypes";
import AddChallenge from "./AddChallenge";
import ChallengeCard from "./ChallengeCard";
import {
  fetchAllChallengesAsync,
  selectChallenges,
} from "./allChallengesSlice";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const fetchedChallenges = useAppSelector(selectChallenges);

  useEffect(() => {
    dispatch(fetchAllChallengesAsync());
    setChallenges(fetchedChallenges);
  }, [dispatch, fetchedChallenges]);

  return (
    <>
      <Heading>All Challenges</Heading>
      <Button bgColor="purple.200" onClick={onOpen}>
        Create Challenge
      </Button>
      <Button bgColor="purple.200" onClick={onOpen}>
        Edit Challenge
      </Button>
      {challenges && challenges.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {challenges.map((challenge, id) => {
            return <ChallengeCard key={id} challenge={challenge} />;
          })}
        </Flex>
      ) : null}
      <AddChallenge isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AllChallenges;
