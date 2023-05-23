import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";

interface EditProfileProps {
  user: any;
  isOpen: any;
  onClose: any;
  profileData: any;
}

const EditProfile = ({
  user,
  isOpen,
  onClose,
  profileData,
}: EditProfileProps) => {
  const [file, setFile] = useState<any>({});
  const [currentUserUrl, setCurrentUserUrl] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [url, setUrl] = useState<any>("");
  const { currentUser } = useAuth();
  const toast = useToast();
  useEffect(() => {
    const { data } = supabase.storage
      .from("profilePictures")
      .getPublicUrl(`${currentUser.id}`);
    // console.log("setting currentUser");
    setCurrentUserUrl(data.publicUrl);
    setUsername(profileData.username);
    setFullName(profileData.full_name);
    setUrl(profileData.avatar_url);
  }, [
    profileData.username,
    profileData.full_name,
    profileData.avatar_url,
    currentUser.id,
  ]);

  const handleFileSelected = (e: any) => {
    try {
      // console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    // //the first block handles uploading the avatar file to storage if necessary
    if (file.name) {
      try {
        const filename = `${currentUser.id}`;
        const { data, error } = await supabase.storage
          .from("profilePictures")
          .upload(filename, file, {
            cacheControl: "3600",
            upsert: false,
          });
        setUrl(data?.path); // store filepath to save in database
        // console.log("retreived url is: ", url);
      } catch (error) {
        toast({
          title: "There was an error updating your avatar.",
        });
        console.log(error);
      }
    }
    //this block builds the updated profile object
    // const updatedProfile = {
    //   username: username,
    //   full_name: fullName,
    //   avatar_url: profileData.avatar_url,
    // };
    //   //if a file was uploaded and successfully returned, update the avatar_url
    //   if (filepath) {
    //     updatedProfile.avatar_url = filepath;
    //   }
    //now submit the update request to supabase
    try {
      const { data: returnedProfile } = await supabase
        .from("profiles")
        .update({ username: username, full_name: fullName, avatar_url: url })
        .eq("id", profileData.id)
        .select();
      toast({
        title: "Profile updated.",
      });
      // console.log(returnedProfile);
      onClose();
    } catch (error) {
      toast({
        title: "There was a problem updating your profile.",
      });
      console.log(error);
    }
    // const updatedChallenge = {
    //   id: challenge.id,
    //   name,
    //   description,
    //   categoryId,
    // };
    // const returnedChallenge = await dispatch(
    //   editChallengeAsync(updatedChallenge),
    // );
    // setChallenge(returnedChallenge);
    // toast({
    //   title: "Challenge updated.",
    // });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="red.200">Edit Your Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {JSON.stringify(profileData)} */}
            <Box>
              Update Username:
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box>
              Update Full Name:
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Box>
            Update Avatar (CURRENTLY BUGGY):
            <Flex direction="row">
              <Input
                type="file"
                margin="5px"
                id="files"
                className=""
                multiple={false}
                accept="image/*"
                // title="Testing this out"
                onChange={handleFileSelected}
              />
              <Avatar margin="5px" src={currentUserUrl} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={!username || !user}
              bgColor="green.200"
              mr={3}
              onClick={handleEdit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
/*
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [categoryId, setCategoryId] = useState<any>("");
  const dispatch = useAppDispatch();
  const toast = useToast();

  const fetchedCategories = useAppSelector(selectCategories);

  useEffect(() => {
    setName(challenge.name);
    setDescription(challenge.description);
    setCategoryId(challenge.category_id);
  }, [challenge]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        dispatch(fetchAllCategoriesAsync());
        setAllCategories(fetchedCategories);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [dispatch, fetchedCategories]);

  const handleEdit = async () => {
    const updatedChallenge = {
      id: challenge.id,
      name,
      description,
      categoryId,
    };
    const returnedChallenge = await dispatch(
      editChallengeAsync(updatedChallenge),
    );
    setChallenge(returnedChallenge);
    toast({
      title: "Challenge updated.",
    });
    onClose();
  };

  return (
    <Flex direction="column">
      <Heading padding="20px">Edit Profile Modal</Heading>
      
      
    </Flex>
  );
};
*/

export default EditProfile;
