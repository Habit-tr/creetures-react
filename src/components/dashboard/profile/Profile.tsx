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
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import EditProfile from "./EditProfile";
import ReactionBadgeCard from "./ReactionBadgeCard";
import {
  fetchSingleProfileAsync,
  selectSingleProfile,
} from "./Single-All-ProfilesSlice";

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
      const { data } = supabase.storage
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
  return (
    <div>
      <Heading margin="20px">
        <Avatar name={`${currentUser.id}`} src={currentUserUrl} />{" "}
        {profileData.username}'s Profile
      </Heading>
      <Flex
        direction="row"
        wrap="wrap"
        margin="20px"
        justifyContent="space-evenly"
      >
        <Card padding="10px" height="160px" width="30%" justifyContent="center">
          <Center>
            {
              earnedReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length
            }{" "}
            🙌 Earned
          </Center>
          <Center>
            {
              earnedReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length
            }{" "}
            👉 Earned
          </Center>
          <Center>{redeemedRewards.length} 🎁 Redeemed</Center>
          <Center>
            {
              givenReactions.filter(
                (reaction: any) => reaction.type === "highfive",
              ).length
            }{" "}
            🙌 Given
          </Center>
          <Center>
            {
              givenReactions.filter(
                (reaction: any) => reaction.type === "nudge",
              ).length
            }{" "}
            👉 Given
          </Center>
        </Card>{" "}
        <Card width="40%" height="160px" justifyContent="center" padding="10px">
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
      </Flex>
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
      {/* <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Mon</Th>
            <Th>Tues</Th>
            <Th>Weds</Th>
            <Th>Thurs</Th>
            <Th>Fri</Th>
            <Th>Sat</Th>
            <Th>Sun</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr bgColor="red.100">
            <Td>
              <Link to="/commitments">Commitments</Link>
            </Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr bgColor="yellow.100">
            <Td>
              <Link to="/rewards">Rewards</Link>
            </Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table> */}

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
