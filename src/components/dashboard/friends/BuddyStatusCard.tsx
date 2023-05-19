import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";

const BuddyStatusCard = () => {
  const [commitment, setCommitment] = useState<any>({});

  const userId = "ea51ded3-1ebc-4ac6-8089-c3981368a08b";
  const challengeId = 5; //get from parent

  const commitmentId = 84; //figure out ourselves

  const { currentUser } = useAuth();
  const currentUserId = currentUser.id;

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
        .single();
      console.log(fetchedCommitment);
      setCommitment(fetchedCommitment);
    };
    fetchCommitmentId(challengeId);
  }, []);

  //avatar (profile)
  //username (profile)
  //commitment id -
  //is up to date

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
      <pre>{JSON.stringify(commitment)}</pre>
      <Text>CurrentUserId: {currentUserId}</Text>
      <Text>CommitmentId: {commitmentId}</Text>
      <Text>ChallengeId: {challengeId}</Text>
      <Text>UserId: {userId}</Text>
    </Flex>
  );
};

export default BuddyStatusCard;
