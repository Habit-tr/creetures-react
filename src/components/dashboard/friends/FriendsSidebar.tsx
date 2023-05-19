import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { Database } from '../../../utils/supabaseTypes';
import { useAuth } from '../../../context/AuthContext';
import { fetchAllCommitmentsAsync, selectCommitments } from '../challenges/commitments/allCommitmentsSlice';
import ChallengeBuddiesCard from './ChallengeBuddiesCard';

const FriendsSidebar = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();
  let commitments: Database["public"]["Tables"]["commitments"]["Row"][] = useAppSelector(selectCommitments);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchAllCommitmentsAsync(currentUser.id));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [dispatch, currentUser.id]);

  return (
    <Box
      w="275px"
      h="440px"
      border="2px black solid"
      margin="20px"
      padding="10px"
    >
      <Heading
        size="md"
        mb="20px"
        color="purple.500"
        // cursor="pointer"
        // onClick={() => navigate("/friends")}
      >
        FELLOW CREETURES
      </Heading>
      {/* <Text mb="10px">
        Sort top friends by # of shared challenges commited to. Show avatar,
        most recent check-in, highfives and nudges.
      </Text>
      <Text mb="10px">Andrew nudged Ben!</Text>
      <Text mb="10px">Jack high-fived Simin!</Text>
      <Text mb="10px">Danny committed to a new challenge!</Text>
      <Reaction /> */}
      {commitments && commitments.length
        ? commitments.map(commitment => (
          <ChallengeBuddiesCard
            key={commitment.id}
            challengeId={commitment.challenge_id}
          />
        ))
        : <Text>No buddies yet. Join some challenges and connect with other Creetures!</Text>
      }
    </Box>
  );
};

export default FriendsSidebar;
