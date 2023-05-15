import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { fetchFriendsAsync, selectFriends } from './FriendsSlice';
import FriendCard from '/Users/spak/Desktop/creetures-react/src/components/dashboard/profile/FriendsCard';


const Friends = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFriendsAsync());
  }, [dispatch]);

  const friends = useAppSelector(selectFriends);


  return (
    <>
      <Heading>My Friends</Heading>
      {!friends}
        <Text>No Friends Yet? Make some Friends and Get inspried...</Text>

      {friends && friends.length ? (
        <Flex direction='row' maxW='900px' wrap='wrap'>
          {friends.map(friend => <FriendCard key={friend.id} friend={friend} />)}
        </Flex>
      ) : null}
    </>
  );

};
export default Friends;
