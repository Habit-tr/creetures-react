import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
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

  return (
    <>
      {commitments && commitments.length
        ? commitments.map((commitment: any) => (
            <ChallengeBuddiesCard
              key={commitment.challenge_id}
              challengeId={commitment.challenge_id}
              userId={currentUser.id}
            />
          ))
        : <Text>
            No buddies yet. Join some challenges and connect with other Creetures!
          </Text>
      }
    </>
  );
};

export default FriendsSidebar;
