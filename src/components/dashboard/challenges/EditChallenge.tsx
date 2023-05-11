import {
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
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Challenge } from "../../../utils/supabaseTypes";
// import { editNewChallengeAsync } from "./allChallengesSlice";

interface EditChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
}

const EditChallenge = ({ isOpen, onClose, challenge }: EditChallengeProps) => {
  // const dispatch = useAppDispatch();

  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [categoryId, setCategoryId] = useState<any>(""); //sets to ID number of selected category. currently setting to string

  useEffect(() => {
    setName(challenge.name);
    setDescription(challenge.description);
    setCategoryId(challenge.category_id);
  }, [challenge]);

  const handleEdit = async () => {
    //resend the values available for editing to supabase

    onClose();
  };
  const handleDelete = async () => {
    //deleteById

    onClose();
  };

  // const fetchCategories = async () => {
  //   let { data: categories, error } = await supabase
  //     .from("categories")
  //     .select("*");
  //   setAllCategories(categories);
  // };
  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="red.200">Edit Your Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Name:{" "}
              <Input
                value={name} //needs to be from state
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              Description:{" "}
              <Input
                height="100px"
                value={description} //needs to be from state
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box>
              Category:{" "}
              <Select
                placeholder="Select a category"
                value={categoryId} //needs to be from state
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {/* Will map over allCategories to render these options */}
                <option value="1">fitness</option>
                <option value="2">health</option>
                <option value="3">diet</option>
                <option value="4">music</option>
              </Select>
            </Box>
            {categoryId}
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={!challenge || !categoryId}
              bgColor="red.200"
              mr={3}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
            <Button
              isDisabled={!challenge || !categoryId}
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

export default EditChallenge;
