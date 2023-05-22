import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabaseClient";
import BuddyStatusCard from "./BuddyStatusCard";

interface ChallengeBuddiesProps {
  challengeId: number;
  userId: string;
}

const ChallengeBuddiesCard = ({ challengeId, userId }: ChallengeBuddiesProps) => {
  const [fetchedBuddies, setFetchedBuddies] = useState<any>({});

  const getCurrentDay = () => {
    const date = new Date();
    return String(date.getDay());
  };

  useEffect(() => {
    const fetchBuddies = async () => {
      const { data: commitments } = await supabase
        .from("commitments")
        .select("*, challenge: challenges(name), profile: profiles(*)")
        .neq("user_id", userId)
        .match({ challenge_id: challengeId, is_active: true });
      const currentBuddies = commitments?.filter(buddy => (
        buddy.frequency.includes(getCurrentDay())
      ));
      setFetchedBuddies(currentBuddies);
    };
    fetchBuddies();
  }, [challengeId, userId]);

  return fetchedBuddies && fetchedBuddies.length ? (
    <Box className="challenge-buddies-card" m="0px" w="100%">
      <Heading mb="0px" size="md">
        {fetchedBuddies[0].challenge.name.toUpperCase()}
      </Heading>
      <Flex direction="column">
        {fetchedBuddies.map((buddy: any) => (
          <BuddyStatusCard key={buddy.user_id} commitment={buddy} />
        ))}
      </Flex>
    </Box>
  ) : null;
};

export default ChallengeBuddiesCard;
