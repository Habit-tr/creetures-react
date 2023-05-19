import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../utils/reduxHooks';
import { fetchAllCommitmentsAsync, selectCommitments } from './allCommitmentsSlice';
import CommitmentCard from './CommitmentCard';

const AllCommitments = () => {
  const dispatch = useAppDispatch();
  const commitments = useAppSelector(selectCommitments);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchAllCommitmentsAsync());
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [dispatch]);

  if (!commitments || commitments.length === 0) {
    return <Text>You don't have any commitments, go make some!</Text>;
  }

  return (
    <>
      <Heading m='10px'>My Commitments</Heading>
      <Flex 
        m='10px'
        maxW='900px'
        direction='row'
        wrap='wrap'>
        {commitments && commitments.length
          ? commitments.map(commitment => (
            <CommitmentCard key={commitment.id} commitment={commitment} />
          ))
          : null}
      </Flex>
    </>
  );
};

export default AllCommitments;
