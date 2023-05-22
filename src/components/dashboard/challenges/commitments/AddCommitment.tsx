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
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import { Database } from "../../../../utils/supabaseTypes";
import {
  fetchAllRewardsAsync,
  selectRewards,
} from "../../profile/allRewardsSlice";
import { postSharedUsersAsync } from "../../profile/friends/sharedUsersSlice";
import { postNewCommitmentAsync } from "./allCommitmentsSlice";
import supabase from "../../../../utils/supabaseClient";


interface newRewardProps {
  rewardName: string,
  description: string,
  user_id: string,
  id: number,
}

interface AddCommitmentProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Database["public"]["Tables"]["challenges"]["Insert"];
}



const AddCommitment = ({ isOpen, onClose, challenge }: AddCommitmentProps) => {
  const dispatch = useAppDispatch();
  const { session } = useAuth();
  const user = session.session.user;
  const rewards = useAppSelector(selectRewards);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllRewardsAsync());
    };
    fetchData();
  }, [dispatch]);

  const nullReward = {
    created_at: null,
    date_last_redeemed: null,
    description: null,
    id: 0,
    is_clicked: false,
    name: "",
    times_redeemed: null,
    user_id: "",
  };

  const [days, setDays] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");
  const [goals, setGoals] = useState<string>("");
  const [newRewardName, setNewRewardName] = useState<string>("");
  const [showNewRewardInput, setShowNewRewardInput] = useState<boolean>(false);
  const [reward, setReward] =
    useState<Database["public"]["Tables"]["rewards"]["Row"]>(nullReward);

  const rewardList = (
    rewards: Database["public"]["Tables"]["rewards"]["Row"][],
  ) => {
    const selectableRewards = ["Select reward"];
    rewards.forEach((reward) => {
      selectableRewards.push(reward.name);
    });
    return selectableRewards;
  };

  const handleDayClick = (dayChar: string) => {
    if (days.includes(dayChar)) {
      const newString = days.replace(dayChar, "");
      setDays(newString);
    } else {
      const newString = days + dayChar;
      setDays(newString);
    }
  };

  const handleTimeframeSelect = (time: string) => {
    if (time === "Morning (4am-12pm)") {
      setTimeframe("12");
    } else if (time === "Afternoon (12pm-8pm)") {
      setTimeframe("20");
    } else if (time === "Night (8pm-4am)") {
      setTimeframe("4");
    } else {
      setTimeframe("");
    }
  };

  const handleRewardSelect = (rewardName: string) => {
    if(rewardName === "new") {
      setShowNewRewardInput(true)
      setReward(nullReward);
    }
    else if (rewardName === "Select reward") {
      setReward(nullReward);
      setShowNewRewardInput(false);
    } else {
      let selectedReward: any = rewards.find(
        (reward) => reward.name === rewardName,
      );
      setReward(selectedReward);
      setShowNewRewardInput(false);
    }
  };

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (newRewardName) {
        const { newReward }: any = await supabase
          .from('rewards')
          .insert({ name: newRewardName })
          .single();

        await dispatch(
          postNewCommitmentAsync({
            challenge_id: challenge.id,
            frequency: days,
            goals,
            reward_id: newReward.id,
            timeframe,
            user_id: user.id,
          }),
        );
      } else if (reward && reward.id) {
        await dispatch(
          postNewCommitmentAsync({
            challenge_id: challenge.id,
            frequency: days,
            goals,
            reward_id: reward.id,
            timeframe,
            user_id: user.id,
          }),
        );
      } else {
        await dispatch(
          postNewCommitmentAsync({
            challenge_id: challenge.id,
            frequency: days,
            goals,
            reward_id: null,
            timeframe,
            user_id: user.id,
          }),
        );
      }

      await dispatch(
        postSharedUsersAsync({
          challenge_id: challenge.id,
          user_id: user.id,
        }),
      );

      toast({
        title: "Committed to challenge!",
      });

      setDays("");
      setTimeframe("");
      setGoals("");
      setReward(nullReward);
      onClose();
      navigate("/commitments");
    } catch (error) {
      // Handle the error here
      console.error(error);
      // Show an error toast or perform any necessary actions
    }

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {challenge && challenge.name
          ? <ModalHeader bgColor="green.200">
              Commit to {challenge.name.toUpperCase()} Challenge
            </ModalHeader>
          : <ModalHeader bgColor="green.200">
              Commit to this challenge
            </ModalHeader>
        }
        <ModalCloseButton />
        <ModalBody>
          <Text mt="20px" mb="20px">
            Please select the days you'd like to commit:
          </Text>
          <Box mb="20px">
            <Checkbox onChange={() => handleDayClick("0")} /> Sun{"  "}
            <Checkbox onChange={() => handleDayClick("1")} /> Mon{"  "}
            <Checkbox onChange={() => handleDayClick("2")} /> Tue{"  "}
            <Checkbox onChange={() => handleDayClick("3")} /> Wed{"  "}
            <Checkbox onChange={() => handleDayClick("4")} /> Thurs{"  "}
            <Checkbox onChange={() => handleDayClick("5")} /> Fri{"  "}
            <Checkbox onChange={() => handleDayClick("6")} /> Sat
          </Box>
          <Box mb="20px">
            Time Frame:
            <Select
              w="260px"
              mb="20px"
              onChange={(e) => handleTimeframeSelect(e.target.value)}
              // value={timeframe}
            >
              <option>Select time frame</option>
              <option>Morning (4am-12pm)</option>
              <option>Afternoon (12pm-8pm)</option>
              <option>Night (8pm-4am)</option>
            </Select>
          </Box>
          <Box mb="20px">
            Goals (Optional):
            <Textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </Box>
          <Box>
            Reward (Optional):
            <Select
              w="260px"
              mb="20px"
              onChange={(e) => handleRewardSelect(e.target.value)}
            >
              {rewards && rewards.length
                ? rewardList(rewards).map((reward, idx) => (
                    <option key={idx}>{reward}</option>
                  ))
                : null}

                <option value={'new'}>
                Create New Reward...
              </option>
            </Select>
            {showNewRewardInput ?
            (<>{'Name your Reward'}
            <Input
            type="text"
            value={newRewardName}
            onChange={(e) => setNewRewardName(e.target.value)}
            >
            </Input></>): <></>}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="green.200"
            mr={3}
            isDisabled={!days || !timeframe}
            onClick={handleSubmit}
          >
            Commit to Challenge
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCommitment;
