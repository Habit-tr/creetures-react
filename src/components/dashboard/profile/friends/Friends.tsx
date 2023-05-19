import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import AllProfiles from "./AllProfiles";
import { fetchFriendsAsync, selectFriends } from "./FriendsSlice";

const Friends = () => {
  const dispatch = useAppDispatch();

  // const [friendslist, setFriendslist] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchFriendsAsync());
  }, [dispatch]);

  const friends = useAppSelector(selectFriends);

  return (
    <>
      <HStack>
        <Flex
          justifyContent="space-between"
          height="100vh"
          width="100vw"
          color="white"
        >
          <Box flex="1" bg="green.500">
            <Heading>My Friends</Heading>
            <Box>
              {!friends}
              <Text>No Friends Yet? Make some Friends and Get inspried...</Text>
            </Box>
          </Box>

          <Box flex="1" bg="tomato">
            <Heading>Find New Friends</Heading>
            <Box>
              <AllProfiles />
            </Box>
          </Box>
        </Flex>
      </HStack>
    </>
  );
};
export default Friends;

// {/* <Box  bg='tomato'>
// <Heading>Find New Friends</Heading>
// <Box >
//    {friends && friends.length ? (
//    <Flex direction='row' maxW='1000px' wrap='wrap' justifyContent='center'>
//    {friends.map(friend => <FriendCard key={friend.id} friend={friend} />)}
//    </Flex>
//    ) : null}
// </Box>
// </Box> */}
