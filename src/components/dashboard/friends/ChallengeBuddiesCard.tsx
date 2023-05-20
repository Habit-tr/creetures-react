import { Card, CardBody, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabaseClient";
import TestStatusCard from "./TestStatusCard";

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
      console.log(commitments);
    };
    fetchBuddies();
  }, [challengeId]);

  return fetchedBuddies && fetchedBuddies.length ? (
    <Card
      margin="10px"
      w="90%"
      border="1px black solid"
      color="black"
      bgGradient="linear(to-b, gray.100, gray.300)"
    >
      <CardBody>
        <Heading mb="0px" size="md">
          {fetchedBuddies[0].challenge.name.toUpperCase()}
        </Heading>
        {fetchedBuddies.map((buddy: any) => (
          <TestStatusCard key={buddy.user_id} commitment={buddy} />
        ))}
      </CardBody>
    </Card>
  ) : null;
};

export default ChallengeBuddiesCard;
