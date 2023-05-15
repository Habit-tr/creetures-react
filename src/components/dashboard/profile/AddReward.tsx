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
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { postNewRewardAsync } from "./allRewardsSlice";

interface AddRewardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddReward = ({ isOpen, onClose }: AddRewardProps) => {
  const dispatch = useAppDispatch();
  const { session } = useAuth();
  const user = session.session.user;
  const [rewardName, setRewardName] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    dispatch(
      postNewRewardAsync({
        rewardName,
        description,
        user_id: user.id,
        timesRedeemed: 0,
      }),
    );
    toast({
      title: "Reward added",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="purple.200">Create New Reward</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {JSON.stringify(user.id)}
            <Box>
              Name: {" "}
              <Input
                value={rewardName}
                onChange={(e) => setRewardName(e.target.value)}
              />
            </Box>
            <Box>
              Description:
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!rewardName}
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

export default AddReward;