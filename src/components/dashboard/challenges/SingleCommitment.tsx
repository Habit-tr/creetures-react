import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { fetchSingleCommitmentAsync, selectCommitment } from './singleCommitmentSlice';
import RenderMedal from './RenderMedal';
import Reaction from '../profile/AllReactions';

const SingleCommitment = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCommitmentAsync(id));
  }, [dispatch, id]);

  const commitment = useAppSelector(selectCommitment);

  if (!commitment) {
    return <Text>Loading...</Text>;
  }

  const { badgeLevel, challenge, frequency, isUpToDate, timeframe } = commitment;

  const dayFrequency = (frequency: string) => {
    const days: string[] = [];
    const frequencyArray = frequency?.split('');
    frequencyArray?.forEach(day => {
      if (day === 'M') {
        days.push('Monday');
      }
      if (day === 'T') {
        days.push('Tuesday');
      }
      if (day === 'W') {
        days.push('Wednesday');
      }
      if (day === 'H') {
        days.push('Thursday');
      }
      if (day === 'F') {
        days.push('Friday');
      }
      if (day === 'S') {
        days.push('Saturday');
      }
      if (day === 'U') {
        days.push('Sunday');
      }
    });
    const allDays = days.join(', ')
    return <Text>{`Frequency: ${allDays}`}</Text>
  }

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Heading as='h1'>{challenge.name}&nbsp;&nbsp;</Heading>
        <RenderMedal level={badgeLevel} />
      </Box>
      <Heading as='h2' size='md'>
        Category:&nbsp;&nbsp;
        <Link to={`/challenges/categories/${challenge.category.name}`}>
          {challenge.category.name}
        </Link>
      </Heading>
      {frequency && frequency.length
      ? dayFrequency(frequency)
      : null
      }
      {timeframe && timeframe.length
      ? <Text>Time of day: {timeframe}</Text>
      : null
      }
      <br />
      {isUpToDate
      ? <Text fontWeight='bold'>You are up to date on your challenge!</Text>
      : <Text fontWeight='bold'>You behind on your challenge</Text>
      }
      <Reaction />
    </>
  )
};

export default SingleCommitment;
