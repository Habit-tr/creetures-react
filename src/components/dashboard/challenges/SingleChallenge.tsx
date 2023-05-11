import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import EditChallenge from "./EditChallenge";
import { deleteChallengeAsync } from "./allChallengesSlice";
import {
  fetchSingleChallengeAsync,
  selectChallenge,
} from "./singleChallengeSlice";

const SingleChallenge = () => {
  const [challenge, setChallenge] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { urlId } = useParams();
  const fetchedChallenge = useAppSelector(selectChallenge);

  useEffect(() => {
    const id = urlId;
    const fetchChallenge = async () => {
      try {
        await dispatch(fetchSingleChallengeAsync({ id }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchChallenge();
  }, [dispatch, urlId, isOpen]); //need to figure out this dependency array

  useEffect(() => {
    setChallenge(fetchedChallenge);
  }, [fetchedChallenge]);

  const handleDelete = async (id: number | string) => {
    await dispatch(deleteChallengeAsync({ id }));
    isOpen && onClose();
    navigate("/challenges");
  };

  return (
    <>
      {challenge && challenge.id && (
        <>
          <Heading>{challenge.name}</Heading>
          <Text>
            Category:&nbsp;&nbsp;
            <Link to={`/challenges/categories/${challenge.category.name}`}>
              {challenge.category.name}
            </Link>
          </Text>
          {challenge.description && (
            <Flex>Description: {challenge.description}</Flex>
          )}
          <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
            Edit
          </Button>
          <Button
            margin="10px"
            bgColor="green.200"
            onClick={() => navigate(`/challenges/${urlId}/commit`)}
          >
            Commit
          </Button>
          <Button
            margin="10px"
            bgColor="red.200"
            onClick={() => handleDelete(challenge.id)}
          >
            <DeleteIcon />
          </Button>
          <EditChallenge
            isOpen={isOpen}
            onClose={onClose}
            challenge={challenge}
            handleDelete={handleDelete}
            setChallenge={setChallenge} //passing setter down to refresh state when edited challenge comes back
          />
        </>
      )}
    </>
  );
};

export default SingleChallenge;
