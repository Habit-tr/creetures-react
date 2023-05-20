import {
  Avatar,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";

interface EditProfileProps {
  user: any;
  isOpen: any;
  onClose: any;
}

const EditProfile = ({ user, isOpen, onClose }: EditProfileProps) => {
  const [file, setFile] = useState<any>([]);
  const [currentUserUrl, setCurrentUserUrl] = useState("");
  const [username, setUsername] = useState("");
  const { currentUser } = useAuth();
  useEffect(() => {
    const { data } = supabase.storage
      .from("profilePictures")
      .getPublicUrl(`${currentUser.id}`);
    console.log("setting currentUser");
    setCurrentUserUrl(data.publicUrl);
  }, [currentUser.id]);

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

  const handleEdit = async () => {
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
            <Box>
              Username:
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Avatar src={currentUserUrl} />
            <Input
              type="file"
              id="files"
              className=""
              multiple={false}
              accept="image/*"
              title="Testing this out"
              onChange={handleFileSelected}
            />
            <Button type="submit" className="" onClick={(e) => handleSubmit(e)}>
              Submit New Profile Picture
            </Button>
          </ModalBody>

          <ModalFooter>
            {/* <Button
              isDisabled={!challenge || !categoryId}
              bgColor="red.200"
              mr={3}
              onClick={() => handleDelete(challenge.id)}
            >
              Delete
            </Button> */}
            <Button
              isDisabled={!username || !user}
              bgColor="green.200"
              mr={3}
              onClick={() => handleEdit()}
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
