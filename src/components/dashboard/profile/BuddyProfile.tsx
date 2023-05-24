import { Avatar, Card, Center, Flex, Heading, Text, Box, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import ReactionBadgeCard from "./ReactionBadgeCard";
import {
  fetchSingleProfileAsync,
  selectSingleProfile,
} from "./Single-All-ProfilesSlice";

import HighFive from "../components/Highfive";
import Nudge from "../components/Nudge";
import Reward from "../components/Reward";

const BuddyProfile = () => {
  const { buddy_id } = useParams();
  // const [currentUserUrl, setCurrentUserUrl] = useState("");
  const [earnedReactions, setEarnedReactions] = useState<any>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<any>([]);
  const [givenReactions, setGivenReactions] = useState<any>([]);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectSingleProfile);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSingleProfileAsync({ id: buddy_id }));
      const { data: myFetchedEarnedReactions } = await supabase
        .from("reactions")
        .select(`*, commitments!inner (id)`)
        .eq("commitments.user_id", buddy_id);
      setEarnedReactions(myFetchedEarnedReactions);
      const { data: myFetchedGivenReactions } = await supabase
        .from("reactions")
        .select(`*`)
        .eq(`user_id`, buddy_id);
      setGivenReactions(myFetchedGivenReactions);
      const { data: fetchedRewards } = await supabase
        .from("earned_rewards")
        .select(`*, commitments!inner (id)`)
        .eq(`commitments.user_id`, buddy_id)
        .eq(`is_redeemed`, true);

      setRedeemedRewards(fetchedRewards);
    };
    fetchData();
  }, [dispatch, buddy_id]);

  const profileData = useAppSelector(selectSingleProfile);
  return (
    <div style={{paddingLeft:'50px'}}>

      <Heading margin="10px" paddingBottom='20px'>
        {currentUser && (
          <Avatar width='80px' name={`${buddy_id}`} src={currentUser.avatar_url} />
        )}{" "}
        {profileData && profileData.username}'s Profile
      </Heading>

      <Flex
        direction="row"
        flexWrap="wrap"
        margin="10px"
        justifyContent="space-evenly"
        gridGap={12}
      >
   <Box  flex='1' justifyContent="space-evenly" alignItems='center'>
        <Card
         height='500px'
         >
          <Center marginTop='30px'>
            {earnedReactions &&
              earnedReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length}{" "}
            <HighFive/> <Text style={{padding: '0 15px'}}>Earned</Text>
          </Center>
          <Spacer  />
          <Center>
            {earnedReactions &&
              earnedReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length}{''}
            <Nudge/> <Text style={{padding: '0 10px'}}>Earned</Text>
          </Center>
          <Spacer  />
          <Center>
            {redeemedRewards && redeemedRewards.length} <Reward/> <Text style={{padding: '0 0px'}}>Redeemed</Text>
          </Center>
          <Spacer  />
          <Center>
            {givenReactions &&
              givenReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length}{" "}
            <HighFive/><Text style={{padding: '0 15px'}}>Given</Text>
          </Center>
          <Spacer  />
          <Center marginBottom='30px'>
            {givenReactions &&
              givenReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length}{" "}
            <Nudge/><Text style={{padding: '0 15px'}}>Given</Text>
          </Center>
        </Card>{" "}
        </Box>

        <Box flex='5' >
          <Flex flexWrap="wrap" gap='6'>
        {profileData &&
          profileData.commitments &&
          profileData.commitments.map((badge: any, i: number) => (
            <ReactionBadgeCard key={badge.id} badge={badge}  />
          ))}
          </Flex>
          </Box>



      </Flex>



    </div>
  );
};

export default BuddyProfile;
