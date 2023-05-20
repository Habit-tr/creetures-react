import { Avatar, Card, Center, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import ReactionBadgeCard from "./ReactionBadgeCard";
import {
  fetchSingleProfileAsync,
  selectSingleProfile,
} from "./Single-All-ProfilesSlice";

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
      console.log("buddy id in useEffect: ", buddy_id);
      await dispatch(fetchSingleProfileAsync({ id: buddy_id }));
      // const { data } = supabase.storage
      //   .from("profilePictures")
      //   .getPublicUrl(`${currentUser.id}`);
      // setCurrentUserUrl(data.publicUrl);
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
        <Card padding="10px" height="160px" width="30%" justifyContent="center">
          <Center>
            {earnedReactions &&
              earnedReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length}{" "}
            🙌 Earned
          </Center>
          <Center>
            {earnedReactions &&
              earnedReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length}{" "}
            👉 Earned
          </Center>
          <Center>
            {redeemedRewards && redeemedRewards.length} 🎁 Redeemed
          </Center>
          <Center>
            {givenReactions &&
              givenReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length}{" "}
            🙌 Given
          </Center>
          <Center>
            {givenReactions &&
              givenReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length}{" "}
            👉 Given
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
