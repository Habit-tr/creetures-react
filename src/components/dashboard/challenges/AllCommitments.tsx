import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { fetchAllCommitmentsAsync, selectCommitments } from './allCommitmentsSlice';
import CommitmentCard from './CommitmentCard';

const AllCommitments = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCommitmentsAsync());
  }, [dispatch]);

  const commitments = useAppSelector(selectCommitments);

  if (!commitments) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Heading>My Commitments</Heading>
      {commitments && commitments.length ? (
        <Flex direction='row' maxW='900px' wrap='wrap'>
          {commitments.map(commitment => <CommitmentCard key={commitment.id} commitment={commitment} />)}
        </Flex>
      ) : null}
    </>
  );
};

export default AllCommitments;
