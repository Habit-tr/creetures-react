import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchAllCommitmentsAsync, selectCommitments } from "../dashboard/challenges/commitments/allCommitmentsSlice";
import CommitmentCard from "../dashboard/challenges/commitments/CommitmentCard";
import { useAuth } from "../../context/AuthContext";

const AllCommitments = () => {
  const dispatch = useAppDispatch();
  const commitments = useAppSelector(selectCommitments);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchAllCommitmentsAsync(currentUser.id));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [dispatch, currentUser.id]);

  if (!commitments || commitments.length === 0) {
    return <Text>You don't have any commitments, go make some!</Text>;
  }

  const activeCommitments = commitments.filter(commitment => commitment.is_active);
  const inactiveCommitments = commitments.filter(commitment => !commitment.is_active);

  return (
    <>
      <Heading m="10px">My Commitments</Heading>
      <Flex 
        m="10px"
        maxW="1250px"
        direction="row"
        wrap="wrap"
      >
        {activeCommitments && activeCommitments.length
          ? activeCommitments.map(commitment => (
            <CommitmentCard key={commitment.id} commitment={commitment} />
          ))
          : null
        }
      </Flex>
      {inactiveCommitments && inactiveCommitments.length
        ? <>
            <Heading as="h2" m="10px" fontSize="2xl">Previous Commitments</Heading>
            <Flex 
              m="10px"
              maxW="1250px"
              direction="row"
              wrap="wrap"
            >
              {inactiveCommitments.map(commitment => (
                <CommitmentCard key={commitment.id} commitment={commitment} />
              ))}
            </Flex>
          </>            
        : null
      }
    </>
  );
};

export default AllCommitments;
