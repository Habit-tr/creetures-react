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
import { Challenge } from "../../../utils/supabaseTypes";
import {
  fetchAllCategoriesAsync,
  selectCategories,
} from "./allCategoriesSlice";
import { editChallengeAsync } from "./singleChallengeSlice";

interface EditChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
  setChallenge: React.Dispatch<any>;
}

const EditChallenge = ({
  isOpen,
  onClose,
  challenge,
  setChallenge,
}: EditChallengeProps) => {
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [categoryId, setCategoryId] = useState<any>("");

  const dispatch = useAppDispatch();

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
    onClose();
  };
  const handleDelete = async () => {
    //deleteById

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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box>
              Category:
              <Select
                value={categoryId}
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
