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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import AddCommitment from "./commitments/AddCommitment";
import EditChallenge from "./EditChallenge";
import { deleteChallengeAsync } from "./allChallengesSlice";
import {
  fetchSingleChallengeAsync,
  selectChallenge,
} from "./singleChallengeSlice";
import { fetchSharedUsersAsync, selectSharedUsers } from "../profile/sharedUsersSlice";
// import { Database } from "../../../utils/supabaseTypes";

const SingleChallenge = () => {
  const [challenge, setChallenge] = useState<any>({});
  // const [sharedUsers, setSharedUsers] = useState<Database["public"]["Tables"]["challenge_users"]["Row"][]>([]);
  const { isOpen: isCommitOpen , onOpen: onCommitOpen, onClose: onCommitClose } = useDisclosure()
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { urlId } = useParams();
  const fetchedChallenge = useAppSelector(selectChallenge);
  const fetchedSharedUsers = useAppSelector(selectSharedUsers);

  useEffect(() => {
    const id = urlId;
    const fetchChallenge = async () => {
      try {
        await dispatch(fetchSingleChallengeAsync(id));
        await dispatch(fetchSharedUsersAsync(id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchChallenge();
  }, [dispatch, urlId, isEditOpen]); //need to figure out this dependency array

  useEffect(() => {
    setChallenge(fetchedChallenge);
    // setSharedUsers(fetchedSharedUsers)
  }, [fetchedChallenge]);

  const handleDelete = async (id: number | string) => {
    await dispatch(deleteChallengeAsync({ id }));
    isEditOpen && onEditClose();
    toast({
      title: "Challenge deleted.",
    });
    navigate("/challenges");
  };
  const toast = useToast(); //https://chakra-ui.com/docs/components/toast/usage

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
          {fetchedSharedUsers && fetchedSharedUsers.length
            ? fetchedSharedUsers.map((user) => (
              <Card
                key={user.id}
                w="100px"
                h="100px"
                p="5px"
                border="1px solid black"
                m="10px"
                alignItems="center"
                justifyContent="center">
                {user.profile.avatar_url
                  ? <Avatar name={`${user.profile.username}`} src={user.profile.avatar_url} />
                  : null
                }
                <Text>{user.profile.username}</Text>
              </Card>
            ))
            : <Text>No one has committed to this challenge.</Text>
            }
        </Flex>
        <Button
          margin="10px"
          bgColor="green.200"
          onClick={onCommitOpen}
        >
          Commit
        </Button>
        <Button
          margin="10px"
          bgColor="orange.200"
          onClick={onEditOpen}
        >
          <EditIcon />
        </Button>
        <Button
          margin="10px"
          bgColor="red.200"
          onClick={() => handleDelete(challenge.id)}
        >
          <DeleteIcon />
        </Button>
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
