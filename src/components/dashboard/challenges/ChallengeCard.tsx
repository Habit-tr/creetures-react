import { Avatar, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../../utils/supabaseClient";
import { Challenge, Database } from "../../../utils/supabaseTypes";

interface ChallengeCardProps {
  challenge: Challenge;
  category?: Database["public"]["Tables"]["categories"]["Row"];
}

const ChallengeCard = ({ challenge, category }: ChallengeCardProps) => {
  const [sharedUsers, setSharedUsers] = useState<any>([]);

  useEffect(() => {
    const fetchSharedUsers = async () => {
      const { data } = await supabase
        .from("commitments")
        .select("*, challenge: challenges(name), profile: profiles(*)")
        .match({ challenge_id: challenge.id, is_active: true });
      setSharedUsers(data);
    };
    fetchSharedUsers();
  }, [challenge.id]);

  return (
    <>
      <Link to={`/challenges/${challenge.id}`}>
        <Card
          w="400px"
          m="10px"
          border="2px black solid"
          color="black"
          bgGradient="linear(to-b, gray.100, gray.300)"
        >
          <CardBody fontSize="sm">
            <Heading mb="0px" size="md">
              {challenge.name?.toUpperCase()}
            </Heading>
            <Text>Description: {challenge.description}</Text>
            <Text>Category: {category?.name?.toUpperCase()}</Text>
            <Text>Committed Creetures:</Text>
            <Flex>
              {sharedUsers && sharedUsers.length
                ? sharedUsers.map((user: any) => (
                  <Flex
                    key={user.user_id}
                    flexDirection="column"
                    alignItems="center"
                    m="5px"
                  >
                    {user.profile.avatar_url
                      ? <Avatar
                          h="35px"
                          w="35px"
                          name={`${user.profile.username}`}
                          src={user.profile.avatar_url}
                        />
                      : null
                    }
                    <Text fontSize="xs">{user.profile.username}</Text>
                  </Flex>
                ))
                : <Text>No one has committed to this challenge.</Text>
              }
            </Flex>
            <br />
            <Text fontSize="sm" fontStyle="italic">Click for Details</Text>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};

export default ChallengeCard;
