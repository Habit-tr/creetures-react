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
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import {
  fetchAllCategoriesAsync,
  selectCategories,
} from "./allCategoriesSlice";
import { postNewChallengeAsync } from "./allChallengesSlice";

interface AddChallengeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChallenge = ({ isOpen, onClose }: AddChallengeProps) => {
  const dispatch = useAppDispatch();

  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [challengeName, setChallengeName] = useState(""); //sets to whatever value is typed into input
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    dispatch(postNewChallengeAsync({ challengeName, description, categoryId }));
    //created_by: "31928c26-8a01-41c6-947b-0fadccabf3eb",
    //will need to pull UUID from authenticated user object when that's available
    onClose();
  };

  const fetchedCategories = useAppSelector(selectCategories);

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
