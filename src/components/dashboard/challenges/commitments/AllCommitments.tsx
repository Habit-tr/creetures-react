import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../utils/reduxHooks';
import { fetchAllCommitmentsAsync, selectCommitments } from './allCommitmentsSlice';
import CommitmentCard from './CommitmentCard';

const AllCommitments = () => {
  const dispatch = useAppDispatch();
  const commitments = useAppSelector(selectCommitments);

  useEffect(() => {
    dispatch(fetchAllCommitmentsAsync());
  }, [dispatch]);

  if (!commitments || commitments.length === 0) {
    return <Text>You don't have any commitments, go make some!</Text>;
  }

  return (
    <>
      <Heading>My Commitments</Heading>
      <Flex direction='row' maxW='900px' wrap='wrap'>
        {commitments.map(commitment => (
          <CommitmentCard key={commitment.id} commitment={commitment} />
        ))}
      </Flex>
    </>
  );
};

export default AllCommitments;
