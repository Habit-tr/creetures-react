import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { Database } from "../../../utils/supabaseTypes";
import {
  fetchAllCommitmentsAsync,
  selectCommitments,
} from "../challenges/commitments/allCommitmentsSlice";
import ChallengeBuddiesCard from "./ChallengeBuddiesCard";

const TestFriendsSidebar = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();
  const commitments: Database["public"]["Tables"]["commitments"]["Row"][] =
    useAppSelector(selectCommitments);

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
    <Box border="1px black solid">
      <Heading>Friends Sidebar</Heading>
      {commitments.map((commitment) => (
        <ChallengeBuddiesCard
          key={commitment.challenge_id}
          challengeId={commitment.challenge_id}
        />
      ))}
    </Box>
  );
};
export default TestFriendsSidebar;
