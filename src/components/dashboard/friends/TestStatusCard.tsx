import { Avatar, Box, Heading } from "@chakra-ui/react";
import ReactionsToggle from "./ReactionsToggle";

const TestStatusCard = ({ commitment }: any) => {
  return (
    <Box border="1px black solid" width="80%">
      <Avatar src={commitment.profile.avatar_url} />
      <Heading>{commitment.profile.username}</Heading>
      {/* <pre>{JSON.stringify(commitment, null, 2)}</pre> */}
      <ReactionsToggle commitId={commitment.id} />
    </Box>
  );
};
export default TestStatusCard;
