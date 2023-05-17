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
import { useAppDispatch, useAppSelector } from '../../../../utils/reduxHooks';
import { Database } from "../../../../utils/supabaseTypes";
import { editCommitmentAsync } from './singleCommitmentSlice';
import { fetchAllRewardsAsync, selectRewards } from '../../profile/allRewardsSlice';

interface EditCommitmentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCommitment: Database['public']['Tables']['commitments']['Update'];
  handleDelete: (id: number) => Promise<void>;
};

const EditCommitment = ({
  isOpen,
  onClose,
  selectedCommitment,
  handleDelete,
}: EditCommitmentProps) => {
  const [commitment, setCommitment] = useState<any>(selectedCommitment)
  const [days, setDays] = useState<any>('');
  const [goals, setGoals] = useState<any>(selectedCommitment.goals);
  const [rewardId, setRewardId] = useState<any>(selectedCommitment.reward_id);
  const [timeframe, setTimeframe] = useState<any>(selectedCommitment.timeframe);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchAllRewardsAsync());
  }, [dispatch]);

  const rewards = useAppSelector(selectRewards);

  const rewardList = (rewards: Database['public']['Tables']['rewards']['Row'][]) => {
    const selectableRewards = ['Select reward (Optional)'];
    rewards.forEach(reward => {
      selectableRewards.push(reward.name);
    })
    return selectableRewards;
  };

  const handleDayClick = (dayChar: string) => {
    console.log('commitment:', commitment);
    console.log('days: ', days);
    console.log('goals: ', goals);
    console.log('rewardId: ', rewardId);
    console.log('timeframe: ', timeframe);
    if (days.includes(dayChar)) {
      const newString = days.replace(dayChar, '');
      setDays(newString);
    }
    if (!days.includes(dayChar)) {
      const newString = days + dayChar;
      setDays(newString);
    }
  };

  const handleTimeframeSelect = (time: string) => {
    if (time === 'Select time frame') {
      setTimeframe('');
    } else {
      setTimeframe(time);
    }
  }

  const handleRewardSelect = (rewardName: string) => {
    if (rewardName === 'Select reward (Optional)') {
      setRewardId(null);
    } else {
      let selectedReward: any = rewards.find(reward => reward.name === rewardName);
      setRewardId(selectedReward.id);
    }
  }

  const handleEdit = async () => {
    const updatedCommitment = {
      id: commitment.id,
      frequency: days,
      goals,
      reward_id: rewardId,
      timeframe,
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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="orange.200">Edit Your Commitment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please select the days you'd like to commit:</Text>
            <Box mb='20px'>
              <Checkbox onChange={() => handleDayClick('M')} /> Mon{' '}
              <Checkbox onChange={() => handleDayClick('T')} /> Tue{' '}
              <Checkbox onChange={() => handleDayClick('W')} /> Wed{' '}
              <Checkbox onChange={() => handleDayClick('H')} /> Thurs{' '}
              <Checkbox onChange={() => handleDayClick('F')} /> Fri{' '}
              <Checkbox onChange={() => handleDayClick('S')} /> Sat{' '}
              <Checkbox onChange={() => handleDayClick('U')} /> Sun
            </Box>
            <Box>
              <Select w='260px' mb='20px' onChange={(e) => handleTimeframeSelect(e.target.value)}>
                <option>Select time frame</option>
                <option>Morning (4am-12pm)</option>
                <option>Afternoon (12pm-8pm)</option>
                <option>Night (8pm-4am)</option>
              </Select>
            </Box>
            <Box mb='20px'>
              Goals (Optional):
              <Textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </Box>
            <Box>
              <Select w='260px' mb='20px' onChange={(e) => handleRewardSelect(e.target.value)}>
                {rewards && rewards.length
                ? rewardList(rewards).map((reward, idx) => (
                  <option key={idx}>{reward}</option>
                ))
                : null}
              </Select>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor="red.200"
              mr={3}
              onClick={() => handleDelete(commitment.id)}
            >
              Delete
            </Button>
            <Button
              isDisabled={!days || !timeframe}
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

export default EditCommitment;
