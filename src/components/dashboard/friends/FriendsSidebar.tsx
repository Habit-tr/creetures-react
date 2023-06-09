import { Box, Card } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { Database } from "../../../utils/supabaseTypes";
import {
  fetchAllCommitmentsAsync,
  selectCommitments,
} from "../challenges/commitments/allCommitmentsSlice";
import ChallengeBuddiesCard from "./ChallengeBuddiesCard";

const FriendsSidebar = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();
  const commitments: Database["public"]["Tables"]["commitments"]["Row"][] =
    useAppSelector(selectCommitments);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllCommitmentsAsync(currentUser.id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch, currentUser.id]);

  const activeCommitments = commitments.filter(
    (commitment) => commitment.is_active,
  );

  return (
    <Box
      id="friends-sidebar"
      h="calc(100vh - 258px)"
      p="10px"
      border="1px solid lightgray"
      borderRadius="4px"
      overflow="auto"
    >
      {activeCommitments && activeCommitments.length ? (
        activeCommitments.map((commitment: any) => (
          <ChallengeBuddiesCard
            key={commitment.challenge_id}
            challengeId={commitment.challenge_id}
            userId={currentUser.id}
          />
        ))
      ) : (
        <Card
          textAlign="center"
          margin="10px"
          padding="10px"
          colorScheme="orange"
        >
          <Link to="/challenges">
            You don't have any buddies yet. Commit to some challenges and
            connect with other Creetures!
          </Link>
        </Card>
      )}
    </Box>
  );
};

export default FriendsSidebar;
