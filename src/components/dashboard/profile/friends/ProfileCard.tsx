import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { Database } from "../../../../utils/supabaseTypes";

interface ProfileProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

const ProfileCard = ({ profile }: ProfileProps) => {
  const { id, username, avatar_url, full_name } = profile;
  console.log(avatar_url);
  console.log(full_name);
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      key={id}
    >
      <WrapItem>
        <Avatar name="full_nam" src="https://bit.ly/dan-abramov" />
      </WrapItem>

      <Stack>
        <CardBody>
          <Heading size="md">{username}</Heading>

          <Text py="2">The Commitment</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Add Friend
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
