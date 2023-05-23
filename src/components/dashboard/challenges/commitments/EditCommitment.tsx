import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import { Database } from "../../../../utils/supabaseTypes";
import {
  fetchAllRewardsAsync,
  selectRewards,
} from "../../profile/allRewardsSlice";
import { editCommitmentAsync } from "./singleCommitmentSlice";

interface EditCommitmentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCommitment: Database["public"]["Tables"]["commitments"]["Update"];
}

const EditCommitment = ({
  isOpen,
  onClose,
  selectedCommitment,
}: EditCommitmentProps) => {
  const [commitment, setCommitment] = useState<any>(selectedCommitment);
  const [days, setDays] = useState<any>("");
  const [timeframe, setTimeframe] = useState<any>("");
  const [goals, setGoals] = useState<any>("");
  const [rewardId, setRewardId] = useState<any>("");
  const dispatch = useAppDispatch();
  const toast = useToast();
  const rewards = useAppSelector(selectRewards);

  useEffect(() => {
    setCommitment(selectedCommitment);
    setDays(selectedCommitment.frequency);
    setTimeframe(selectedCommitment.timeframe);
    setGoals(selectedCommitment.goals);
    setRewardId(selectedCommitment.reward_id);
  }, [selectedCommitment]);

  useEffect(() => {
    const fetchRewards = async () => {
      await dispatch(fetchAllRewardsAsync());
    };
    fetchRewards();
  }, [dispatch]);

  const handleDayClick = (dayChar: string) => {
    if (days.includes(dayChar)) {
      const newString = days.replace(dayChar, "");
      setDays(newString);
    } else {
      const newString = days + dayChar;
      setDays(newString);
    }
  };

  const handleEdit = async () => {
    const updatedCommitment = {
      id: commitment.id,
      frequency: days,
      goals,
      reward_id: rewardId,
      timeframe,
      updated_at: new Date(),
    };
    const returnedCommitment = await dispatch(
      editCommitmentAsync(updatedCommitment),
    );
    setCommitment(returnedCommitment);
    toast({
      title: "Commitment updated.",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bgColor="orange.200">Edit Your Commitment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mt="20px" mb="20px">
            Please select the days you'd like to commit:
          </Text>
          <Box mb="20px">
            <Checkbox
              colorScheme="yellow"
              defaultChecked={days.includes("0")}
              onChange={() => handleDayClick("0")}
            />{" "}
            Sun{" "}
            <Checkbox
              colorScheme="yellow"
              defaultChecked={days.includes("1")}
              onChange={() => handleDayClick("1")}
            />{" "}
            Mon{" "}
            <Checkbox
              colorScheme="yellow"
              defaultChecked={days.includes("2")}
              onChange={() => handleDayClick("2")}
            />{" "}
            Tue{" "}
            <Checkbox
              colorScheme="yellow"
              defaultChecked={days.includes("3")}
              onChange={() => handleDayClick("3")}
            />{" "}
            Wed{" "}
            <Checkbox
              colorScheme="yellow"
              defaultChecked={days.includes("4")}
              onChange={() => handleDayClick("4")}
            />{" "}
            Thur{" "}
            <Checkbox
              colorScheme="yellow"
              defaultChecked={days.includes("5")}
              onChange={() => handleDayClick("5")}
            />{" "}
            Fri{" "}
            <Checkbox
              colorScheme="yellow"
              defaultChecked={days.includes("6")}
              onChange={() => handleDayClick("6")}
            />{" "}
            Sat
          </Box>
          <Box mb="20px">
            Time Frame:
            <Select
              mb="20px"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="">Select Time Frame</option>
              <option value="12">Morning (4am-12pm)</option>
              <option value="20">Afternoon (12pm-8pm)</option>
              <option value="4">Night (8pm-4am)</option>
            </Select>
          </Box>
          <Box mb="20px">
            Goals (Optional):
            <Textarea
              value={goals || ""}
              onChange={(e) => setGoals(e.target.value)}
            />
          </Box>
          <Box>
            Reward (Optional):
            <Select
              mb="20px"
              value={rewardId}
              onChange={(e) => setRewardId(e.target.value)}
            >
              <option value="">Select Reward</option>
              {rewards && rewards.length
                ? rewards.map((reward) => (
                    <option key={reward.id} value={reward.id}>
                      {reward.name}
                    </option>
                  ))
                : null}
            </Select>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button
            isDisabled={!days || !timeframe}
            colorScheme="green"
            ml={3}
            onClick={() => handleEdit()}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCommitment;
