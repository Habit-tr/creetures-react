import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabaseClient";
import BuddyStatusCard from "./BuddyStatusCard";

const ChallengeBuddiesCard = ({ challengeId }: { challengeId: number }) => {
  const [fetchedBuddies, setFetchedBuddies] = useState<any>({});

  useEffect(() => {
    const fetchBuddies = async () => {
      const { data: commitments } = await supabase
        .from("commitments")
        .select("*, profile: profiles(*), challenge: challenges(name)")
        .eq("challenge_id", challengeId)
        .eq("is_active", true);
      setFetchedBuddies(commitments);
    };
    fetchBuddies();
  }, [challengeId]);

  return fetchedBuddies && fetchedBuddies.length ? (
    <Box margin="0px" width="100%">
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
