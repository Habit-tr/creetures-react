import { Avatar, Box, Button, Center, Heading } from "@chakra-ui/react";
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
  const [reactions, setReactions] = useState<any>({});

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
    console.log("useEffect");
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
    const fetchReactions = async (id: any) => {
      let { data: fetchedReactions, error } = await supabase
        .from("reactions")
        .select(`*, reactor: profiles(username, avatar_url)`)
        .eq("commitment_id", id)
        .eq("is_archived", false);
      setReactions(fetchedReactions);
    };
    fetchCommitmentId(challengeId);
    fetchProfile({ userId });
    fetchReactions(commitment.id);
  }, [dispatch, commitment.id]);

  const profile = useAppSelector(selectSingleProfile);

  //reactions
  //if the auth user has an non-archived reaction to this commitment id

  //maybe have their badge?

  return (
    <>
      <Box width="90px" border="1px black solid">
        <Center flexDirection="column">
          <Avatar src={profile.avatar_url} />

          <Heading size="md">{profile.username}</Heading>

          <Button p="0px">🙌 0</Button>
          <Button p="0px">👉 3</Button>
        </Center>
      </Box>
      {/* <Text>ChallengeId: {challengeId}</Text>
      <pre>{JSON.stringify(commitment)}</pre>
      <Text>UserId: {userId}</Text>
      <pre>{JSON.stringify(profile)}</pre>
      <Text>CurrentUserId: {currentUserId}</Text>
      <pre>{JSON.stringify(reactions)}</pre> */}
    </>
  );
};

export default BuddyStatusCard;
