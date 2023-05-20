import { Avatar, Box, Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import { selectSingleProfile } from "../profile/Single-All-ProfilesSlice";
import ReactionsToggle from "./ReactionsToggle";

interface BuddyStatusCardProps {
  challengeId: number;
  userId: string;
}

const BuddyStatusCard = ({ challengeId, userId }: BuddyStatusCardProps) => {
  const [commitment, setCommitment] = useState<any>({});

  const { currentUser } = useAuth();
  const currentUserId = currentUser.id;

  const testChallengeId = 5;
  const testUserId = "ea51ded3-1ebc-4ac6-8089-c3981368a08b";

  useEffect(() => {
    console.log("fetch commitments");
    const fetchCommitment = async (challengeId: number) => {
      let { data: fetchedCommitment } = await supabase
        .from("commitments")
        .select(`*, profile: profiles(*)`)
        .eq("challenge_id", testChallengeId)
        .eq("user_id", testUserId)
        .eq("is_active", true)
        .single();
      setCommitment(fetchedCommitment);
    };
    fetchCommitment(challengeId);

    // console.log("fetch profile");
    // const fetchProfile = async ({ userId }: { userId: string }) => {
    //   await dispatch(fetchSingleProfileAsync({ id: userId }));
    // };
    // fetchProfile({ userId });
  }, [challengeId, userId]);

  const profile = useAppSelector(selectSingleProfile);

  return (
    <>
      <Box width="90px" border="1px black solid">
        <Center flexDirection="column">
          <Avatar src={profile.avatar_url} />
          <Text>{profile.username}</Text>
          <ReactionsToggle commitId={commitment.id} />
        </Center>
      </Box>
      <Text>ChallengeId: {challengeId}</Text>
      <pre>{JSON.stringify(commitment)}</pre>
      <Text>UserId: {userId}</Text>
      <pre>{JSON.stringify(profile)}</pre>
      <Text>CurrentUserId: {currentUserId}</Text>
    </>
  );
};

export default BuddyStatusCard;
