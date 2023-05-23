import { Avatar, Card, Center, Flex, Heading, Text } from "@chakra-ui/react";
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
    <div>
      <Heading margin="20px">
        {currentUser && (
          <Avatar name={`${buddy_id}`} src={currentUser.avatar_url} />
        )}{" "}
        {profileData && profileData.username}'s Profile
      </Heading>
      <Flex
        direction="row"
        wrap="wrap"
        margin="20px"
        justifyContent="space-evenly"
      >
        <Card direction='column' padding="20px" height="460px" width="20%" justifyContent="space-evenly" alignItems='center'>
          <Center>
            {earnedReactions &&
              earnedReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length}{" "}
            <HighFive/> <Text style={{padding: '0 15px'}}>Earned</Text>
          </Center>
          <Center>
            {earnedReactions &&
              earnedReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length}{" "}
            <Nudge/> <Text style={{padding: '0 10px'}}>Earned</Text>
          </Center>
          <Center>
            {redeemedRewards && redeemedRewards.length} <Reward/> <Text style={{padding: '0 0px'}}>Redeemed</Text>
          </Center>
          <Center>
            {givenReactions &&
              givenReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length}{" "}
            <HighFive/><Text style={{padding: '0 15px'}}>Given</Text>
          </Center>
          <Center>
            {givenReactions &&
              givenReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length}{" "}
            <Nudge/><Text style={{padding: '0 15px'}}>Given</Text>
          </Center>
        </Card>{" "}
        {profileData &&
          profileData.commitments &&
          profileData.commitments.map((badge: any, i: number) => (
            <ReactionBadgeCard key={badge.id} badge={badge} />
          ))}
      </Flex>
    </div>
  );
};

export default BuddyProfile;
