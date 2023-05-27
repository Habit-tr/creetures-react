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
      transition="transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out"
      _hover={{ transform: "scale(1.07)", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
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
          {commitment.profile.username
          ? <Heading fontSize="xl">
              {commitment.profile.username.toUpperCase()}
            </Heading>
          : <Heading fontSize="xl">Unnamed User</Heading>}
        </Link>
        <Text fontSize="sm">
          {commitment.is_up_to_date ? `up to date` : `behind schedule`}{" "}
        </Text>
      </Flex>
      <Flex width="20%" justifyContent="end">
        <Box border="none" p="0px" m="sm" display="inline-block">
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
