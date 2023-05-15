import { Card, Text, Box, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Database } from "../../../utils/supabaseTypes";
import Reaction from "./AllReactions";
import AddFriend from "./AddFriend";

interface FriendsCardProps {
  friend:  Database['public']['Tables']['profiles']['Row'];
}


const FriendsCard = ({ friend }: FriendsCardProps) => {
  const { user_id, username, avatar_url } = friend;

  return (
    <>
  <Card
  margin="10px"
  padding="0px"
  w="300px"
  h="150px"
  bgColor="blue.200"
  justify="center"
>
  <Flex>
  <Text fontSize="10px" >
    Avatar: {avatar_url}
  </Text>

  <Text fontSize="20px" >
    {username}
    {user_id}
  </Text>
  <Button>

  </Button>

  </Flex>



  <Reaction />

</Card>
    </>
  );
};

export default FriendsCard;


{/* <Link to={`/friends/${id}`}>
<Card
  margin="10px"
  padding="10px"
  w="300px"
  h="150px"
  bgColor="blue.200"
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
</Link> */}
