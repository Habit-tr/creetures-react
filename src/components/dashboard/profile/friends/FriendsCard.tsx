import { Button, Card, Flex, Text } from "@chakra-ui/react";
import { Database } from "../../../../utils/supabaseTypes";
import Reaction from "../AllReactions";

interface FriendsCardProps {
  friend: Database["public"]["Tables"]["profiles"]["Row"];
}

const FriendsCard = ({ friend }: FriendsCardProps) => {
  const { id, username, avatar_url } = friend;

  return (
    <>
      <Card
        margin="10px"
        padding="0px"
        w="300px"
        h="150px"
        colorScheme="blue"
        justify="center"
      >
        <Flex>
          <Text fontSize="10px">Avatar: {avatar_url}</Text>

          <Text fontSize="20px">
            {username}
            {id}
          </Text>
          <Button></Button>
        </Flex>

        <Reaction />
      </Card>
    </>
  );
};

export default FriendsCard;

{
  /* <Link to={`/friends/${id}`}>
<Card
  margin="10px"
  padding="10px"
  w="300px"
  h="150px"
  colorScheme="blue"
  justify="center"
>
  <Text fontSize="20px" align="center">
    {username}
  </Text>
  <Text fontSize="10px" align="center">
    Avatar: {avatar_url}
  </Text>
</Card>
<Reaction />
</Link> */
}
