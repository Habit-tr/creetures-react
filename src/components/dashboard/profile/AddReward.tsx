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
import { Database } from "../../../utils/supabaseTypes";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { fetchAllRewardsAsync, postNewRewardAsync, updateRewardAsync } from "./allRewardsSlice";

interface AddRewardProps {
  isOpen: boolean;
  onClose: () => void;
  reward?: Database['public']['Tables']['rewards']['Row'] | null;
}


const AddReward = ({ isOpen, onClose, reward }: AddRewardProps) => {
  const dispatch = useAppDispatch();
  const { session } = useAuth();
  const user = session.session.user;
  const [rewardName, setRewardName] = useState(reward ? reward.name : '');
  const [description, setDescription] = useState(reward ? reward.description : '');

  useEffect(() => {
    setRewardName(reward ? reward.name : '');
    setDescription(reward ? reward.description : '');
  }, [reward]);

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      if (reward) {
        await dispatch(updateRewardAsync({ id: reward.id, name: rewardName, description }));
        dispatch(fetchAllRewardsAsync());
      } else {
        await dispatch(postNewRewardAsync({
          rewardName,
          description,
          user_id: user.id,
          times_redeemed: 0,
        }));
      }
      toast({
        title: reward ? "Reward updated" : "Reward added",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error updating/adding reward",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader bgColor="purple.200">
          {reward ? "Update Reward" : "Create New Reward"}
        </ModalHeader>
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
                value={description || ''}
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