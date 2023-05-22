import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import AllProfiles from "./AllProfiles";
import { fetchFriendsAsync, selectFriends } from "./FriendsSlice";

const ExploreFriends = () => {


  return (
    <>
    <Text>Friends</Text>

    </>
  );
};
export default ExploreFriends;
