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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { Database } from "../../../utils/supabaseTypes";
import { editRewardAsync } from "./singleRewardSlice";

interface EditRewardProps {
  isOpen: boolean;
  onClose: () => void;
  reward: Database['public']['Tables']['rewards']['Row']
  setReward: React.Dispatch<any>
}

const EditReward = ({
  isOpen,
  onClose,
  reward,
  setReward,
}: EditRewardProps) => {
  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    setName(reward.name);
    setDescription(reward.description);
  }, [reward]);

  const handleEdit = async () => {
    const updatedReward = {
      id: reward.id,
      name,
      description,
    };
    const returnedReward = await dispatch(
      editRewardAsync(updatedReward),
    );
    setReward(returnedReward);
    toast({
      title: "Reward updated.",
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="red.200">Edit Your Reward</ModalHeader>
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
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!reward}
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

export default EditReward;