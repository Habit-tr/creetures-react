import {
  Avatar,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import EditProfile from "./EditProfile";
import ReactionBadgeCard from "./ReactionBadgeCard";
import {
  fetchSingleProfileAsync,
  selectSingleProfile,
} from "./Single-All-ProfilesSlice";

import HighFive from "../components/Highfive";
import Nudge from "../components/Nudge";
import Reward from "../components/Reward";
import Edit from "../components/Edit";
import Level from "../components/Level";


const Profile = () => {
  const { currentUser } = useAuth();
  const [currentUserUrl, setCurrentUserUrl] = useState("");
  const [earnedReactions, setEarnedReactions] = useState<any>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<any>([]);
  const [givenReactions, setGivenReactions] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.storage
        .from("profilePictures")
        .getPublicUrl(`${currentUser.id}`);
      setCurrentUserUrl(data.publicUrl);
      dispatch(fetchSingleProfileAsync({ id: currentUser.id }));
      const { data: myFetchedEarnedReactions } = await supabase
        .from("reactions")
        .select(`*, commitments!inner (id)`)
        .eq("commitments.user_id", currentUser.id);
      setEarnedReactions(myFetchedEarnedReactions);
      const { data: myFetchedGivenReactions } = await supabase
        .from("reactions")
        .select(`*`)
        .eq(`user_id`, currentUser.id);
      setGivenReactions(myFetchedGivenReactions);
      const { data: fetchedRewards } = await supabase
        .from("earned_rewards")
        .select(`*, commitments!inner (id)`)
        .eq(`commitments.user_id`, currentUser.id)
        .eq(`is_redeemed`, true);

      setRedeemedRewards(fetchedRewards);
    };
    fetchData();
  }, [dispatch, currentUser.id, isOpen]);

  const profileData = useAppSelector(selectSingleProfile);

  if (!profileData || profileData.length === 0) {
    <Card textAlign="center" margin="10px" padding="10px" bgColor="orange.100">
      <Link to="/challenges">
        You don't have any commitments yet -- go make some!
      </Link>
    </Card>;
  }
  return (
    <div>
      <Heading margin="20px">
        {/* <Avatar name={`${currentUser.id}`} src={currentUserUrl} />{" "} */}
        <Avatar name={`${currentUser.id}`} src={profileData.avatar_url} />{" "}
        {profileData.username}'s Profile
      </Heading>

      <Flex
        direction="row"
        flexWrap="wrap"
        margin="20px"
        justifyContent="space-evenly"
        padding="10px"
        gridGap={12}
      >
        <Box
          flex="2.5"
          justifyContent="space-evenly"
          minW="370px"
          padding="0px"
          alignItems="center"
        >
          <Card
            height='200px'
            padding="20px"
            direction="row"
            justifyContent="space-around"
            flexWrap="wrap"
          >
            <Center>
              {earnedReactions &&
                earnedReactions.length &&
                earnedReactions.filter(
                  (reaction: any) => reaction.type === "highfive",
                ).length}{" "}
              <HighFive /> <Text fontWeight="bold" style={{ padding: "0 15px" }}>Earned</Text>
            </Center>
            <Spacer />
            <Center>
              {earnedReactions &&
                earnedReactions.length &&
                earnedReactions.filter(
                  (reaction: any) => reaction.type === "nudge",
                ).length}{" "}
              <Nudge /> <Text fontWeight="bold" style={{ padding: "0 10px" }}>Earned</Text>
            </Center>
            <Spacer />
            <Center>{redeemedRewards.length} <Reward />{" "}
                <Text fontWeight="bold" style={{ padding: "0 0px" }}>Redeemed</Text>
            </Center>
            <Spacer />
            <Center>
              {givenReactions &&
                givenReactions.length &&
                givenReactions.filter(
                  (reaction: any) => reaction.type === "highfive",
                ).length}{" "}
              <HighFive /><Text fontWeight="bold" style={{ padding: "0 15px" }}>Given</Text>
            </Center>
            <Spacer />
            <Center>
              {givenReactions &&
                givenReactions.length &&
                givenReactions.filter(
                  (reaction: any) => reaction.type === "nudge",
                ).length}{" "}
              <Nudge /><Text fontWeight="bold" style={{ padding: "0 15px" }}>Given</Text>
            </Center>
          </Card>{" "}
        </Box>

        <Box flex='1'>
        <Card  padding="10px" height='200px'>
          <Center flexDirection="column" marginTop="-60px">
          <Edit style={{ marginRight: "200px" }}/>
            <Text>UserName:{profileData.username}</Text>
            <Text>Name:{profileData.full_name}</Text>
            <Text>Email:{`${currentUser.email}`}</Text>
            <Button margin="10px" colorScheme="purple" onClick={() => onOpen()}>
              Edit Settings
            </Button>
          </Center>
        </Card>
        </Box>
      </Flex>


      {profileData &&
      profileData.commitments &&
      profileData.commitments.length ? (
        <>
          <Flex direction="row" wrap="wrap" margin="30px">
            <Level />
            <Heading margin="10px" marginTop='20px'>My Badges</Heading>
          </Flex>
          <hr />
          <Heading as="h2" m="30px" fontSize="2xl">
            My Active Commitments
          </Heading>
          <hr />
          <Flex
            direction="row"
            wrap="wrap"
            margin="30px"
            gap="6"
          >
            {profileData.commitments
              .filter((commitment: any) => commitment.is_active) //add a sort to rank badges from highest to lowest
              .map((badge: any, i: number) => (
                <Link to={`/commitments/${badge.id}`} key={badge.id}>
                  <ReactionBadgeCard badge={badge} />
                </Link>
              ))}
          </Flex>
        </>
      ) : (
        <></>
      )}

      {profileData &&
      profileData.commitments &&
      profileData.commitments.length &&
      profileData.commitments.filter((commitment: any) => !commitment.is_active)
        .length > 0 ? (
        <>
          <hr />
          <Heading as="h2" m="30px" fontSize="2xl">
            My Paused Commitments
          </Heading>
          <hr />
          <Flex
            direction="row"
            wrap="wrap"
            margin="30px"
            gap="6"
          >
            {profileData.commitments
              .filter((commitment: any) => !commitment.is_active)
              .map((badge: any, i: number) => (
                <Link to={`/commitments/${badge.id}`} key={badge.id}>
                  <ReactionBadgeCard badge={badge} />
                </Link>
              ))}
          </Flex>
        </>
      ) : (
        <></>
      )}
      <EditProfile
        user={currentUser}
        profileData={profileData}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default Profile;
