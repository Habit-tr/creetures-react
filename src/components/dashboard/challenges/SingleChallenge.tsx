import {
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import supabase from "../../../utils/supabaseClient";
import { useAuth } from "../../../context/AuthContext";
import {
  fetchSingleChallengeAsync,
  selectChallenge,
} from "./singleChallengeSlice";
import { deleteChallengeAsync } from "./allChallengesSlice";
import { fetchCommitmentChallengeIdsAsync, selectCommitmentChallengeIds } from "./commitments/addCommitmentSlice";
import AddCommitment from "./commitments/AddCommitment";
import EditChallenge from "./EditChallenge";

const SingleChallenge = () => {
  const dispatch = useAppDispatch();
  const { urlId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isOpen: isCommitOpen, onOpen: onCommitOpen, onClose: onCommitClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const toast = useToast(); //https://chakra-ui.com/docs/components/toast/usage
  const [challenge, setChallenge] = useState<any>({});
  const [sharedUsers, setSharedUsers] = useState<any>([]);
  const fetchedChallenge = useAppSelector(selectChallenge);
  const fetchedChallengeIds = useAppSelector(selectCommitmentChallengeIds);
  const challengeIds = fetchedChallengeIds.map(challenge => challenge.challenge_id);
  
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
      const { data } = await supabase
        .from("commitments")
        .select("*, challenge: challenges(name), profile: profiles(*)")
        .match({ challenge_id: challenge.id, is_active: true });
      setSharedUsers(data);
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
    challenge && challenge.id && (
      <>
        <Heading>Challenge: {challenge.name.toUpperCase()}</Heading>
        <Text>
          Category:{" "}
          <Link to={`/challenges/categories/${challenge.category.name}`}>
            {challenge.category.name}
          </Link>
        </Text>
        {challenge.description && (
          <Flex>Description: {challenge.description}</Flex>
        )}
        <Text>Creetures of this Challenge:</Text>
        <Flex>
          {sharedUsers && sharedUsers.length
            ? sharedUsers.map((user: any) => (
              // This route isn't set up yet, but should link to a user's profile
              <Link to={`/profile/${user.user_id}`} key={user.user_id}>
                <Card
                  w="70px"
                  h="70px"
                  p="3px"
                  m="5px"
                  alignItems="center"
                  justifyContent="center"
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
                </Card>
              </Link>
            ))
            : <Text>No one has committed to this challenge.</Text>
          }
        </Flex>
        <Button
          m="10px"
          ml="0"
          bgColor="green.200"
          isDisabled={challengeIds.includes(challenge.id)}
          onClick={onCommitOpen}
        >
          Commit
        </Button>
        {currentUser.id === challenge.created_by
        ? <>
            <Button margin="10px" bgColor="orange.200" onClick={onEditOpen}>
              <EditIcon />
            </Button>
            <Button
              margin="10px"
              bgColor="red.200"
              onClick={() => handleDelete(challenge.id)}
            >
              <DeleteIcon />
            </Button>
          </>
          : null
        }
        <AddCommitment
          isOpen={isCommitOpen}
          onClose={onCommitClose}
          challenge={challenge}
        />
        <EditChallenge
          isOpen={isEditOpen}
          onClose={onEditClose}
          challenge={challenge}
          handleDelete={handleDelete}
          setChallenge={setChallenge} //passing setter down to refresh state when edited challenge comes back
        />
      </>
    )
  );
};

export default SingleChallenge;
