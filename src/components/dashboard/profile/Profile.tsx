import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import RenderMedal from "../challenges/RenderMedal";
import EditProfileModal from "./EditProfileModal";
import { fetchSingleProfileAsync, selectSingleProfile } from "./SingleProfileSlice";

const Profile = () => {
  const { currentUser } = useAuth();
  const [currentUserUrl, setCurrentUserUrl] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { data } = supabase.storage
      .from("profilePictures")
      .getPublicUrl(`${currentUser.id}`);
    console.log("setting currentUser");
    setCurrentUserUrl(data.publicUrl);
    dispatch(fetchSingleProfileAsync({ id: currentUser.id }));
  }, [dispatch, currentUser.id]);

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
        <Card
          padding="10px"
          height="100px"
          width="120px"
          justifyContent="center"
        >
          <Center>🙌 14</Center>
          <Center>👉 8</Center>
          <Center>🎁 11</Center>
        </Card>
        {profileData &&
          profileData.commitments &&
          profileData.commitments.map((commitment: any, i: number) => (
            <Card
              padding="10px"
              height="100px"
              width="120px"
              key={i}
              justifyContent="center"
            >
              <Center mb="10px">
                <RenderMedal level={commitment.badge_level} />
              </Center>
              <Center fontSize="xs">{commitment.challenge.name}</Center>
            </Card>
          ))}
      </Flex>
      <Flex direction="row" justifyContent="space-evenly">
        <Box width="45%" margin="20px" border="2px solid black" padding="10px">
          <Text>username: {profileData.username}</Text>
          <Text>Full Name: {profileData.full_name}</Text>
          <Text>Email: {`${currentUser.email}`}</Text>
          <Button margin="10px" bgColor="purple.200">
            Edit Settings
          </Button>
        </Box>
        <Box width="45%" margin="20px" border="2px solid black" padding="10px">
          <Text>Your Friends: COMING SOON</Text>
        </Box>
      </Flex>
      <Table>
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
      </Table>
      {/* <pre>{JSON.stringify(profileData, null, 2)}</pre> */}
      <EditProfileModal />
    </div>
  );
};

export default Profile;
