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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { Challenge } from "../../../utils/supabaseTypes";
import { editChallengeAsync } from "./singleChallengeSlice";

interface EditChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
  handleDelete: (id: number | string) => Promise<void>;
  setChallenge: React.Dispatch<any>;
}

// const fetchCategories = async () => {
//   let { data: categories, error } = await supabase
//     .from("categories")
//     .select("*");
//   setAllCategories(categories);
// };
// useEffect(() => {
//   fetchCategories();
// }, []);

const EditChallenge = ({
  isOpen,
  onClose,
  challenge,
  handleDelete,
  setChallenge,
}: EditChallengeProps) => {
  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [categoryId, setCategoryId] = useState<any>("");
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    setName(challenge.name);
    setDescription(challenge.description);
    setCategoryId(challenge.category_id);
  }, [challenge]);

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="red.200">Edit Your Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Name:
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Box>

            <Box>
              Description:
              <Input
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box>
              Category:
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {/* Will map over allCategories to render these options */}
                <option value="1">fitness</option>
                <option value="2">health</option>
                <option value="3">diet</option>
                <option value="4">music</option>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={!challenge || !categoryId}
              bgColor="red.200"
              mr={3}
              onClick={() => handleDelete(challenge.id)}
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
