import { Box, Button, Checkbox, Heading, Select, Text, Textarea, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../utils/reduxHooks';
import { useAuth } from '../../../../context/AuthContext';
import { fetchSingleChallengeAsync2, selectChallenge } from '../singleChallengeSlice';
import { postNewCommitmentAsync } from './allCommitmentsSlice';

const AddCommitment = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { session } = useAuth();
  const user = session.session.user;

  useEffect(() => {
    dispatch(fetchSingleChallengeAsync2(id));
  }, [dispatch, id]);

  const challenge = useAppSelector(selectChallenge);

  const [goals, setGoals] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('');

  const handleDayClick = (dayChar: string) => {
    if (days.includes(dayChar)) {
      const newString = days.replace(dayChar, "");
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

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    dispatch(
      postNewCommitmentAsync({
        challenge_id: id,
        frequency: days,
        goals,
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
      <Box mb='20px'>
        Goals:
        <Textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </Box>
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
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Night</option>
        </Select>
      </Box>
      <Button 
        isDisabled={!days}
        bgColor="green.200"
        mb='20px' onClick={handleSubmit}>
        Commit to this Challenge
      </Button>
      {/* <Box>currently selected goals as stored in state: {goals}</Box>
      <Box>currently selected days as stored in state: {days}</Box>
      <Box>currently selected timeframe as stored in state: {timeframe}</Box> */}
    </>
  );
};

export default AddCommitment;
