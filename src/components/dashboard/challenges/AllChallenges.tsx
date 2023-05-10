import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddChallenge from "./AddChallenge";
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
      {challenges && challenges.length
        ? challenges.map((challenge) => (
            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
              <Text>{challenge.name}</Text>
            </Link>
          ))
        : null}
      <Button bgColor="purple.200" onClick={onOpen}>
        Create Challenge
      </Button>
      <AddChallenge isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AllChallenges;
