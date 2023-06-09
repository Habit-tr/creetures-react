import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../../utils/supabaseClient";
import { Challenge, Database } from "../../../utils/supabaseTypes";
import Click from "../components/Click";

interface ChallengeCardProps {
  challenge: Challenge;
  category?: Database["public"]["Tables"]["categories"]["Row"];
}

const ChallengeCard = ({ challenge, category }: ChallengeCardProps) => {
  const [sharedUsers, setSharedUsers] = useState<any>([]);

  useEffect(() => {
    const fetchSharedUsers = async () => {
      try {
        if (challenge.id) {
          const { data } = await supabase
            .from("commitments")
            .select("*, challenge: challenges(name), profile: profiles(*)")
            .match({ challenge_id: challenge.id, is_active: true });
          setSharedUsers(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSharedUsers();
  }, [challenge.id]);

  // const findBuddies = () => {
  //   const buddyList: JSX.Element[] = [];
  //   sharedUsers.forEach((user: any, idx: number) => {
  //     while (idx < 5) {
  //       buddyList.push(
  //         <Avatar
  //           h="35px"
  //           w="35px"
  //           name={`${user.profile.username}`}
  //           src={user.profile.avatar_url}
  //         />
  //       );
  //     }
  //     if (idx >= 5) {
  //       buddyList.push(<Text>... {sharedUsers.length - 5} more Creetures</Text>);
  //     }
  //   })
  //   setBuddies(buddyList);
  // }

  // findBuddies();
  // console.log("buddies: ", buddies);

  return (
    <>
      <Link to={`/challenges/${challenge.id}`}>
        <Wrap>
          <WrapItem>
            <Card
              w="350px"
              m="10px"
              p="10px"
              colorScheme="purple"
              color="black"
              overflow="hidden"
              transition="transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "6px 6px 6px rgba(144, 238, 144, 0.9)",
              }}
            >
              <CardBody fontSize="sm">
                <Heading mb="0px" size="md">
                  {challenge.name?.toUpperCase()}
                </Heading>
                <Text>Description: {challenge.description}</Text>
                <Text>Category: {category?.name?.toUpperCase()}</Text>
                <Text marginTop="20px" fontWeight="bold">
                  Committed Creetures:
                </Text>
                <Flex direction="row" flexWrap="wrap">
                  {sharedUsers && sharedUsers.length ? (
                    sharedUsers.map((user: any) => (
                      <Flex
                        key={user.user_id}
                        flexDirection="column"
                        alignItems="center"
                        m="5px"
                      >
                        {user.profile.avatar_url ? (
                          <Avatar
                            h="35px"
                            w="35px"
                            name={`${user.profile.username}`}
                            src={user.profile.avatar_url}
                          />
                        ) : null}
                        <Text fontSize="xs">{user.profile.username}</Text>
                      </Flex>
                    ))
                  ) : (
                    <Text>No one has committed to this challenge.</Text>
                  )}
                </Flex>
                <br />
                <Flex>
                  <Click />
                  <Text fontSize="sm" fontStyle="italic" marginTop="10px">
                    Click for Details
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </WrapItem>
        </Wrap>
      </Link>
    </>
  );
};

export default ChallengeCard;
