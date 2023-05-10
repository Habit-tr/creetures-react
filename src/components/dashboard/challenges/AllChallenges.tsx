import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import AddChallenge from "./AddChallenge";
import ChallengeCard from "./ChallengeCard";
import {
  fetchAllChallengesAsync,
  selectChallenges,
} from "./allChallengesSlice";

const AllChallenges = () => {
  // const [challenges, setChallenges] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const { data } = await supabase.from("challenges").select(); //this is moving to the reducer
    dispatch(fetchAllChallengesAsync());
  }, [dispatch]);

  const challenges = useAppSelector(selectChallenges);

  return (
    <>
      <Heading>All Challenges</Heading>
      {challenges && challenges.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {challenges.map((challenge) => {
            return <ChallengeCard key={challenge.id} challenge={challenge} />;
          })}
        </Flex>
      ) : null}
      <Button bgColor="purple.200" onClick={onOpen}>
        Create Challenge
      </Button>
      <AddChallenge isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AllChallenges;
