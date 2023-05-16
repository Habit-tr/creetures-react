import { Box, Button, Checkbox, Heading, Select, Text, Textarea, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../utils/reduxHooks';
import { useAuth } from '../../../../context/AuthContext';
import { fetchSingleChallengeAsync, selectChallenge } from '../singleChallengeSlice';
import { postNewCommitmentAsync } from './allCommitmentsSlice';
import { fetchAllRewardsAsync, selectRewards } from '../../profile/allRewardsSlice';
import { Database } from '../../../../utils/supabaseTypes';

const AddCommitment = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { session } = useAuth();
  const user = session.session.user;

  useEffect(() => {
    dispatch(fetchSingleChallengeAsync(id));
    dispatch(fetchAllRewardsAsync());
  }, [dispatch, id]);

  const challenge = useAppSelector(selectChallenge);
  const rewards = useAppSelector(selectRewards);

  const nullReward = {
    created_at: null,
    dateLastRedeemed: null,
    description: null,
    id: 0,
    isClicked: false,
    name: '',
    timesRedeemed: null,
    user_id: '',
  };

  const [days, setDays] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('');
  const [reward, setReward] = useState<Database['public']['Tables']['rewards']['Row']>(nullReward);
  const [goals, setGoals] = useState<string>('');

  const rewardList = (rewards: Database['public']['Tables']['rewards']['Row'][]) => {
    const selectableRewards = ['Select reward (Optional)'];
    rewards.forEach(reward => {
      selectableRewards.push(reward.name);
    })
    return selectableRewards;
  };

  const handleDayClick = (dayChar: string) => {
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
    if (time === 'Select time frame (Optional)') {
      setTimeframe('');
    } else {
      setTimeframe(time);
    }
  }

  const handleRewardSelect = (rewardName: string) => {
    if (rewardName === 'Select reward (Optional)') {
      setReward(nullReward);
    } else {
      let selectedReward: any = rewards.find(reward => reward.name === rewardName);
      setReward(selectedReward);
    }
  }

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    dispatch(
      postNewCommitmentAsync({
        challenge_id: id,
        frequency: days,
        goals,
        reward_id: reward.id,
        timeframe,
        user_id: user.id,
      }),
    );
    toast({
      title: 'Committed to challenge!',
    });
    navigate('/commitments');
  };

  return (
    <>
      {challenge && challenge.name
      ? <Heading mb='20px'>Commit to {challenge.name} challenge</Heading>
      : <Heading mb='20px'>Commit to this challenge</Heading>}
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
          <option>Select time frame (Optional)</option>
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
      <Button 
        isDisabled={!days || !timeframe}
        bgColor="green.200"
        mb='20px' onClick={handleSubmit}>
        Commit to this Challenge
      </Button>
    </>
  );
};

export default AddCommitment;
