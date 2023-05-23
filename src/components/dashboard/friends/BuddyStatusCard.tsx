import { Avatar, Box, Card, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ReactionsToggle from "./ReactionsToggle";

const BuddyStatusCard = ({ commitment }: any) => {
  return (
    <Card
      className="buddy-status-card"
      direction="row"
      justifyContent="space-between"
      bgColor="green.200"
      color="black"
      width="325px"
      margin="5px"
      padding="5px"
    >
      <Flex width="20%" justifyContent="baseline" alignItems="center" pl="30px">
        <Link to={`/profile/${commitment.profile.id}`}>
          <Avatar
            height="55px"
            width="55px"
            bgColor="purple"
            border="1px solid black"
            src={commitment.profile.avatar_url}
          />
        </Link>
      </Flex>
      <Flex
        width="60%"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Link to={`/profile/${commitment.profile.id}`}>
          <Heading fontSize="xl">
            {commitment.profile.username.toUpperCase()}
          </Heading>
        </Link>
        <Text fontSize="2xs">
          {commitment.is_up_to_date ? `up to date` : `behind schedule`}{" "}
        </Text>
      </Flex>
      <Flex width="20%" justifyContent="end">
        <Box border="none" p="0px" m="2px" display="inline-block">
          <ReactionsToggle
            commitId={commitment.id}
            status={commitment.is_up_to_date}
          />
        </Box>
      </Flex>
    </Card>
  );
};
export default BuddyStatusCard;
