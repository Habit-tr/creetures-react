import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddChallenge from "./AddChallenge";
import ChallengeCard from "./ChallengeCard";
import {
  fetchAllChallengesAsync,
  selectChallenges,
} from "./allChallengesSlice";

const AllChallenges = () => {
  // const [challenges, setChallenges] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  useEffect(() => {
    // const { data } = await supabase.from("challenges").select(); //this is moving to the reducer
    dispatch(fetchAllChallengesAsync());
  }, []);

  const challenges = useSelector(selectChallenges);

  return (
    <>
      <Heading>All Challenges</Heading>
      {challenges && challenges.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {challenges.map((challenge) => {
            return <ChallengeCard challenge={challenge} />;
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
