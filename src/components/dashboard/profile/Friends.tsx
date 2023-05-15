import { Flex, Heading, Text, Box, Spacer, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { fetchFriendsAsync, selectFriends } from './FriendsSlice';
import FriendCard from '/Users/spak/Desktop/creetures-react/src/components/dashboard/profile/FriendsCard';
import AddFriend from './AddFriend';

const Friends = () => {
  const dispatch = useAppDispatch();

  const [friendslist, setFriendslist] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchFriendsAsync());
  }, [dispatch]);

  const friends = useAppSelector(selectFriends);


  return (
    <>
    <HStack>

    <Flex justifyContent="space-between" height="100vh" width="100vw" color='white'  >
      <Box  bg='green.500' >
        <Heading>My Friends</Heading>
           <Box>
              {!friends}
              <Text>No Friends Yet? Make some Friends and Get inspried...</Text>
           </Box>
      </Box>

      <Box  bg='tomato'>
        <Heading>Find New Friends</Heading>
        <Box >
           {friends && friends.length ? (
           <Flex direction='row' maxW='1000px' wrap='wrap' justifyContent='center'>
           {friends.map(friend => <FriendCard key={friend.id} friend={friend} />)}
           </Flex>
           ) : null}
        </Box>
      </Box>
    </Flex>
    <AddFriend />
    </HStack>



    </>
  );

};
export default Friends;


{/* <Flex>
<Flex>
<Heading>My Friends</Heading>
<Box>
{!friends}
  <Text>No Friends Yet? Make some Friends and Get inspried...</Text>
</Box>
</Flex>

<Flex>
{friends && friends.length ? (
  <Flex direction='row' maxW='900px' wrap='wrap'>
    {friends.map(friend => <FriendCard key={friend.id} friend={friend} />)}
  </Flex>
) : null}
</Flex>

</Flex> */}
