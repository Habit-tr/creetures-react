import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import EditChallenge from "./EditChallenge";
import { deleteChallengeAsync } from "./allChallengesSlice";
import AddCommitment from "./commitments/AddCommitment";
import {
  fetchCommitmentChallengeIdsAsync,
  selectCommitmentChallengeIds,
} from "./commitments/addCommitmentSlice";
import {
  fetchSingleChallengeAsync,
  selectChallenge,
} from "./singleChallengeSlice";
import Challenge from "../components/Challenge";

const SingleChallenge = () => {
  const dispatch = useAppDispatch();
  const { urlId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {
    isOpen: isCommitOpen,
    onOpen: onCommitOpen,
    onClose: onCommitClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const toast = useToast(); //https://chakra-ui.com/docs/components/toast/usage
  const [challenge, setChallenge] = useState<any>({});
  const [sharedUsers, setSharedUsers] = useState<any>([]);
  const fetchedChallenge = useAppSelector(selectChallenge);
  const fetchedChallengeIds = useAppSelector(selectCommitmentChallengeIds);
  const challengeIds = fetchedChallengeIds.map(
    (challenge) => challenge.challenge_id,
  );

  // We have 4 separate useEffects in this component, might want to clean up a bit
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        await dispatch(fetchSingleChallengeAsync(urlId));
      } catch (error) {
        console.error(error);
      }
    };
    fetchChallenge();
  }, [dispatch, urlId, isEditOpen]); //need to figure out this dependency array

  useEffect(() => {
    setChallenge(fetchedChallenge);
  }, [fetchedChallenge]);

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

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchCommitmentChallengeIdsAsync(currentUser.id));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [dispatch, currentUser.id]);

  const handleDelete = async (challengeId: number | string) => {
    await dispatch(deleteChallengeAsync({ challengeId }));
    isEditOpen && onEditClose();
    toast({
      title: "Challenge deleted.",
    });
    navigate("/challenges");
  };

  return (

    challenge &&
    challenge.id && (
      <>
      <Flex
      direction="column"
      flexWrap="wrap"
      margin="30px"
      justifyContent="space-evenly"
      padding="10px"
      gridGap={12}
      gap={20}
      >
        <Box display="flex" flexDirection='column'>
          <Box display="flex">
            <Challenge/>
            <Heading pt='30px'>CHALLENGE ::::: {challenge.name.toUpperCase()}</Heading>
          </Box>
           <Box pl='100px' display="flex" >
            <Text fontSize={"xl"} as='b'> Category:{" "}</Text>
             <Text pl='3' pt='1' fontWeight='500'  fontSize={"lg"}>
                   <Link to={`/challenges?categoryId=${challenge.category_id}`}>
                    {challenge.category.name}
                   </Link>
              </Text>
              </Box>

              <Box pl='100px' display="flex" pt='10px'>
        <Text as='b' fontSize={"xl"}> Description:{" "}</Text>
             {challenge.description && (
             <Flex pl='3'  fontWeight='500'  fontSize={"lg"}> {challenge.description}</Flex>
             )}
        </Box>
        </Box>




        <Box pl='100px'>
           <Box pb='10px' >
             <Text fontSize={"2xl"} fontWeight='bold'>Creetures of this Challenge:</Text>
           </Box>
        <Flex>
          {sharedUsers && sharedUsers.length ? (
            sharedUsers.map((user: any) => (
              // This route isn't set up yet, but should link to a user's profile
              <Link to={`/profile/${user.user_id}`} key={user.user_id}>
                <Card
                  w="70px"
                  h="70px"
                  p="3px"
                  m="5px"
                  alignItems="center"
                  justifyContent="center"
                  transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
                   _hover={{ transform: "scale(1.07)", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)" }}
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
                </Card>
              </Link>
            ))
          ) : (
            <Text>No one has committed to this challenge.</Text>
          )}
        </Flex>
        </Box>

        <Box pl='100px'>
        <Button
          m="10px"
          ml="0"
          colorScheme="green"
          isDisabled={challengeIds.includes(challenge.id)}
          onClick={onCommitOpen}
        >
          Commit
        </Button>
        </Box>


        {currentUser.id === challenge.created_by ? (
          <>
          <Box>
            <Button margin="10px" colorScheme="orange" onClick={onEditOpen}>
              <EditIcon />
            </Button>
          </Box>

          <Box>
            <Button
              margin="10px"
              colorScheme="red"
              onClick={() => handleDelete(challenge.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
          </>
        ) : null}
      <Box>
        <AddCommitment
          isOpen={isCommitOpen}
          onClose={onCommitClose}
          challenge={challenge}
        />
      </Box>
      <Box>
        <EditChallenge
          isOpen={isEditOpen}
          onClose={onEditClose}
          challenge={challenge}
          handleDelete={handleDelete}
          setChallenge={setChallenge}/>
      </Box>
  </Flex>
  </>
    )
  );
};

export default SingleChallenge;
