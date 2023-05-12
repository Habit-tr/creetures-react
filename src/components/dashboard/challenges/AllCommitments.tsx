import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
// import AddCommitment from './AddCommitment';
// import ChallengeCard from "./ChallengeCard";
import { fetchAllCommitmentsAsync, selectCommitments } from './allCommitmentsSlice';
import { Link } from 'react-router-dom';

const AllCommitments = () => {
  // const [challenges, setChallenges] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCommitmentsAsync());
  }, [dispatch]);

  const commitments = useAppSelector(selectCommitments);

  return (
    <>
      <Heading>My Commitments</Heading>
      {commitments && commitments.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {commitments.map((commitment) => (
            <>
              <pre>{JSON.stringify(commitment, null, 2)}</pre>;
              <Button bgColor="purple.200" onClick={onOpen}>
                <Link to={`/commitment/${commitment.id}`}>View commitment</Link>
              </Button>
            </>
          ))}
        </Flex>
      ) : null}
    </>
  );
};

export default AllCommitments;
