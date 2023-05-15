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
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../utils/reduxHooks";
import {
  fetchAllChallengesAsync,
  postNewChallengeAsync,
} from "./allChallengesSlice";

interface AddChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  allCategories: any[];
}

const AddChallenge = ({
  isOpen,
  onClose,
  allCategories,
}: AddChallengeProps) => {
  const dispatch = useAppDispatch();
  const { session } = useAuth();
  const user = session.session.user;
  const [challengeName, setChallengeName] = useState(""); //sets to whatever value is typed into input
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    await dispatch(
      postNewChallengeAsync({
        challengeName,
        description,
        categoryId,
        createdBy: user.id,
      }),
    );
    toast({
      title: "Challenge added.",
    });
    setChallengeName("");
    setDescription("");
    setCategoryId("");
    onClose();
    await dispatch(fetchAllChallengesAsync());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="purple.200">Create a New Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Name:{" "}
              <Input
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
              />
            </Box>
            <Box>
              Description:
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box>
              Category:{" "}
              <Select
                placeholder="Select a category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {allCategories &&
                  allCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={!challengeName || !categoryId}
              bgColor="green.200"
              mr={3}
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddChallenge;
