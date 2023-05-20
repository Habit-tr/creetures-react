import { Card, CardBody, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import {
  fetchActualSharedUsersAsync,
  selectSharedUsers,
} from "../profile/friends/sharedUsersSlice";
import TestStatusCard from "./TestStatusCard";

const ChallengeBuddiesCard = ({ challengeId }: { challengeId: number }) => {
  const dispatch = useAppDispatch();
  const fetchedBuddies = useAppSelector(selectSharedUsers);

  useEffect(() => {
    const fetchBuddies = async () => {
      const { data } = await dispatch(fetchActualSharedUsersAsync(challengeId));
      console.log(data);
    };
    fetchBuddies();
  }, [dispatch, challengeId]);

  return fetchedBuddies && fetchedBuddies.length ? (
    <Card
      margin="10px"
      w="90%"
      border="1px black solid"
      color="black"
      bgGradient="linear(to-b, gray.100, gray.300)"
    >
      <CardBody>
        <Heading mb="0px" size="md">
          {fetchedBuddies[0].challenge.name.toUpperCase()}
        </Heading>
        {fetchedBuddies.map((buddy) => (
          <TestStatusCard key={buddy.user_id} commitment={buddy} />
        ))}
      </CardBody>
    </Card>
  ) : null;
};

export default ChallengeBuddiesCard;
