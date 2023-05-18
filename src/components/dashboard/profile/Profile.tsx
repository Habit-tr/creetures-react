import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import RenderMedal from "../challenges/RenderMedal";
import EditProfileModal from "./EditProfileModal";
import {
  fetchSingleProfileAsync,
  selectSingleProfile,
} from "./Single-All-ProfilesSlice";

const Profile = () => {
  const { currentUser } = useAuth();
  const [currentUserUrl, setCurrentUserUrl] = useState("");
  const [file, setFile] = useState<any>([]);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const filename = `${currentUser.id}`;
    try {
      await supabase.storage.from("profilePictures").upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });
      // const filepath = data.path; // save filepath in database
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = (e: any) => {
    try {
      setFile(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

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
                <RenderMedal level={commitment.badgeLevel} />
              </Center>
              <Center fontSize="xs">{commitment.challenge.name}</Center>
            </Card>
          ))}
      </Flex>
      <Flex direction="row" justifyContent="space-evenly">
        <Box width="45%" margin="20px">
          <Text>username: {profileData.username}</Text>
          <Text>Full Name: {profileData.full_name}</Text>
          <Text>Email: {`${currentUser.email}`}</Text>
          <input
            type="file"
            id="files"
            className=""
            multiple={false}
            accept="image/*"
            title="Testing this out"
            onChange={handleFileSelected}
          />
          <button type="submit" className="" onClick={handleSubmit}>
            Submit New Profile Picture
          </button>
          <Link to="/commitments">
            <Text>Your Commitments</Text>
          </Link>
          <Text>Your Dashboard</Text>
          <Text>Your Rewards</Text>
          <Button margin="10px" bgColor="purple.200">
            Edit Settings
          </Button>
        </Box>
        <Box width="45%" margin="20px">
          <Text>Your Friends: COMING SOON</Text>
        </Box>
      </Flex>
      {/* <pre>{JSON.stringify(profileData, null, 2)}</pre> */}
      <EditProfileModal />
    </div>
  );
};

export default Profile;
