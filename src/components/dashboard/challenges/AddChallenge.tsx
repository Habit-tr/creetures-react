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
import supabase from "../../../utils/supabaseClient";

interface AddChallengeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChallenge = ({ isOpen, onClose }: AddChallengeProps) => {
  // const [allCategories, setAllCategories] = useState<any[]>([]);
  const [challengeName, setChallengeName] = useState(""); //sets to whatever value is typed into input
  const [category, setCategory] = useState(""); //sets to ID number of selected category. currently setting to string

  const handleSubmit = async () => {
    const { data, error } = await supabase.from("challenges").insert([
      {
        name: challengeName,
        category_id: category,
        created_by: "31928c26-8a01-41c6-947b-0fadccabf3eb",
      },
    ]);
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
              Category:{" "}
              <Select
                placeholder="Select a category"
                onChange={(e) => setCategory(e.target.value)}
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
              isDisabled={!challengeName || !category}
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
