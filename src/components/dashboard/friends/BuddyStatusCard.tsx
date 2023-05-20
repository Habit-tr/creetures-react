import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
        <Link to={`/profile/${commitment.profile.id}`}>
          <Avatar
            height="35px"
            width="35px"
            bgColor="purple.100"
            src={commitment.profile.avatar_url}
          />
        </Link>
      </Flex>
      <Text width="40%">
        {commitment.profile.username}, {commitment.id}{" "}
      </Text>
      <Flex width="30%">
        <ReactionsToggle commitId={commitment.id} />
      </Flex>
    </Flex>
  );
};
export default BuddyStatusCard;
