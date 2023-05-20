import { Avatar, Flex, Text } from "@chakra-ui/react";
import ReactionsToggle from "./ReactionsToggle";

const BuddyStatusCard = ({ commitment }: any) => {
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      bgColor="green.100"
      margin="5px"
      padding="5px"
    >
      <Flex width="30%">
        <Avatar
          height="35px"
          width="35px"
          bgColor="purple.100"
          src={commitment.profile.avatar_url}
        />
      </Flex>
      <Text width="40%">
        {commitment.profile.username}, {commitment.id}{" "}
        {JSON.stringify(commitment.is_up_to_date)}
      </Text>
      {/* <pre>{JSON.stringify(commitment, null, 2)}</pre> */}
      <Flex width="30%">
        <ReactionsToggle commitId={commitment.id} />
      </Flex>
    </Flex>
  );
};
export default BuddyStatusCard;
