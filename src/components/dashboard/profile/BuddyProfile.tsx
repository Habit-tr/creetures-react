import {
  Avatar,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import EditProfile from "./EditProfile";
import ReactionBadgeCard from "./ReactionBadgeCard";
import {
  fetchSingleProfileAsync,
  selectSingleProfile,
} from "./Single-All-ProfilesSlice";

const BuddyProfile = () => {
  const { currentUserId } = useParams();
  // const [currentUserUrl, setCurrentUserUrl] = useState("");
  const [earnedReactions, setEarnedReactions] = useState<any>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<any>([]);
  const [givenReactions, setGivenReactions] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectSingleProfile);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchSingleProfileAsync({ id: currentUserId }));
      // const { data } = supabase.storage
      //   .from("profilePictures")
      //   .getPublicUrl(`${currentUser.id}`);
      console.log("setting currentUser");
      // setCurrentUserUrl(data.publicUrl);
      const { data: myFetchedEarnedReactions } = await supabase
        .from("reactions")
        .select(`*, commitments!inner (id)`)
        .eq("commitments.user_id", currentUserId);
      setEarnedReactions(myFetchedEarnedReactions);
      const { data: myFetchedGivenReactions } = await supabase
        .from("reactions")
        .select(`*`)
        .eq(`user_id`, currentUserId);
      setGivenReactions(myFetchedGivenReactions);
      const { data: fetchedRewards } = await supabase
        .from("earned_rewards")
        .select(`*, commitments!inner (id)`)
        .eq(`commitments.user_id`, currentUserId)
        .eq(`is_redeemed`, true);

      setRedeemedRewards(fetchedRewards);
    };
    fetchData();
  }, [dispatch, currentUserId]);

  const profileData = useAppSelector(selectSingleProfile);
  return (
    <div>
      <Heading margin="20px">
        {currentUser && (
          <Avatar name={`${currentUserId}`} src={currentUser.avatar_url} />
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
        {profileData && profileData.username && (
          <Card
            width="40%"
            height="160px"
            justifyContent="center"
            padding="10px"
          >
            <Center flexDirection="column">
              <Text>{profileData.username}</Text>
              <Text>{profileData.full_name}</Text>
              <Text>{`${currentUser.email}`}</Text>
              <Button
                margin="10px"
                bgColor="purple.200"
                width="50%"
                onClick={() => onOpen()}
              >
                Edit Settings
              </Button>
            </Center>
          </Card>
        )}
      </Flex>
      {/* <pre>{JSON.stringify(profileData, null, 2)}</pre> */}
      <Flex
        direction="row"
        wrap="wrap"
        margin="20px"
        justifyContent="space-evenly"
      >
        {profileData &&
          profileData.commitments &&
          profileData.commitments.map((badge: any, i: number) => (
            <ReactionBadgeCard key={badge.id} badge={badge} />
          ))}
      </Flex>
      <EditProfile user={currentUser} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default BuddyProfile;
