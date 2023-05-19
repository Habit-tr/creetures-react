import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Reaction from "../profile/AllReactions";
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { useEffect } from 'react';
import { fetchAllCommitmentsAsync, selectCommitments } from '../challenges/commitments/allCommitmentsSlice';
// import CommitmentCard from './challenges/commitments/CommitmentCard';
import { fetchSharedUsersAsync } from '../profile/friends/sharedUsersSlice';
import { Database } from '../../../utils/supabaseTypes';
import ChallengeBuddiesCard from './ChallengeBuddiesCard';

const FriendsSidebar = () => {
  const dispatch = useAppDispatch();
  let commitments: Database["public"]["Tables"]["commitments"]["Row"][] = useAppSelector(selectCommitments);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchAllCommitmentsAsync());
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [dispatch]);

  // IGNORE THIS
  const findBuddies = async () => {
    const buddiesArray: Database["public"]["Tables"]["challenge_users"]["Row"][] = [];
    await Promise.all(
      commitments.map(async (commitment) => {
        const buddies = await dispatch(fetchSharedUsersAsync(commitment.challenge_id));
        buddiesArray.push(buddies);
      })
    );
    return buddiesArray;
  };
  
  const buddies: any = findBuddies();

  const navigate = useNavigate();
  return (
    <Box
      w="275px"
      h="440px"
      border="2px black solid"
      margin="20px"
      padding="10px"
    >
      <ChallengeBuddiesCard />
      <Heading
        size="md"
        mb="20px"
        color="purple.500"
        cursor="pointer"
        onClick={() => navigate("/friends")}
      >
        FELLOW CREETURES
      </Heading>
      <Text mb="10px">
        Sort top friends by # of shared challenges commited to. Show avatar,
        most recent check-in, highfives and nudges.
      </Text>
      <Text mb="10px">Andrew nudged Ben!</Text>
      <Text mb="10px">Jack high-fived Simin!</Text>
      <Text mb="10px">Danny committed to a new challenge!</Text>
      <Reaction />
      {buddies && buddies.length
        // ? commitments.map(commitment => (
        //   <CommitmentCard key={commitment.id} commitment={commitment} />
        // ))
        // : null}
        ? <pre>{JSON.stringify(buddies, null, 2)}</pre>
        : <Text>No buddies yet. Join some challenges and connect with other Creetures!</Text>
      }
    </Box>
  );
};

export default FriendsSidebar;
