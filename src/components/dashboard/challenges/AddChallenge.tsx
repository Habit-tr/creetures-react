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
import { useState } from "react";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { postNewChallengeAsync } from "./allChallengesSlice";

interface AddChallengeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChallenge = ({ isOpen, onClose }: AddChallengeProps) => {
  const dispatch = useAppDispatch();

  // const [allCategories, setAllCategories] = useState<any[]>([]);
  const [challengeName, setChallengeName] = useState(""); //sets to whatever value is typed into input
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    dispatch(postNewChallengeAsync({ challengeName, description, categoryId }));
    // name: challengeName,
    //     category_id: category,
    //     description: "this is a test",
    //     created_by: "31928c26-8a01-41c6-947b-0fadccabf3eb",

    //will need to pull UUID from authenticated user object when that's available
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
