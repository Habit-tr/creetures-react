import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import {
  fetchSingleProfileAsync,
  selectSingleProfile,
} from "../profile/Single-All-ProfilesSlice";

const BuddyStatusCard = () => {
  const [commitment, setCommitment] = useState<any>({});

  const userId = "ea51ded3-1ebc-4ac6-8089-c3981368a08b";
  const challengeId = 5;

  const { currentUser } = useAuth();
  const currentUserId = currentUser.id;
  const dispatch = useAppDispatch();

  // const fetchProfile = async () => {
  //   let { data: fetchedProfiles, error } = await supabase
  //     .from("profiles")
  //     .select(`*, commitment: is_up_to_date, badge_level, reactions: *`);
  // };

  useEffect(() => {
    const fetchCommitmentId = async (challengeId: number) => {
      let { data: fetchedCommitment, error } = await supabase
        .from("commitments")
        .select(`*`)
        .eq("challenge_id", challengeId)
        .eq("user_id", userId)
        .eq("is_active", true)
        .single();
      setCommitment(fetchedCommitment);
    };
    const fetchProfile = async ({ userId }: { userId: string }) => {
      await dispatch(fetchSingleProfileAsync({ id: userId }));
    };
    fetchCommitmentId(challengeId);
    fetchProfile({ userId });
  }, [dispatch]);

  const profile = useAppSelector(selectSingleProfile);

  //reactions
  //if the auth user has an non-archived reaction to this commitment id

  //maybe have their badge?

  return (
    <Flex direction="column">
      <Heading>BuddyStatusCard</Heading>
      <Avatar />
      <Button m="20px" width="120px">
        REACTION
      </Button>
      <Text>ChallengeId: {challengeId}</Text>
      <pre>{JSON.stringify(commitment)}</pre>
      <Text>UserId: {userId}</Text>
      <pre>{JSON.stringify(profile)}</pre>
      <Text>CurrentUserId: {currentUserId}</Text>
    </Flex>
  );
};

export default BuddyStatusCard;
