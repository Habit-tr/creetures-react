import { Card, CardBody, Heading } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { fetchSharedUsersAsync, selectSharedUsers } from '../profile/friends/sharedUsersSlice';
import BuddyStatusCard from './BuddyStatusCard';

const ChallengeBuddiesCard = ({ challengeId }: { challengeId: number }) => {
  const dispatch = useAppDispatch();
  const fetchedBuddies = useAppSelector(selectSharedUsers);

  useEffect(() => {
    const fetchBuddies = async () => {
      await dispatch(fetchSharedUsersAsync(challengeId));
    }
    fetchBuddies();
  }, [dispatch, challengeId]);

  return (
    fetchedBuddies && fetchedBuddies.length
    ? ( <Card
          margin="10px"
          w="250px"
          border="2px black solid"
          color="black"
          bgGradient="linear(to-b, gray.100, gray.300)"
          >
          <CardBody>
            <Heading mb="0px" size="md">
              {fetchedBuddies[0].challenge.name.toUpperCase()}
            </Heading>
            {fetchedBuddies.map((buddy) => (
                <BuddyStatusCard
                  key={buddy.user_id}
                  challengeId={buddy.challenge_id}
                  userId={buddy.user_id}
                />
            ))}
          </CardBody>
        </Card>
    ) : null
  );
};

export default ChallengeBuddiesCard;
