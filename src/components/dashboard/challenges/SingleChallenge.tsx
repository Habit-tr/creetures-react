import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import EditChallenge from "./EditChallenge";
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
  }, [dispatch, urlId]); //need to figure out this dependency array

  useEffect(() => {
    setChallenge(fetchedChallenge);
  }, [fetchedChallenge]);

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
          <Button bgColor="purple.200" onClick={onOpen}>
            Edit Challenge
          </Button>
          <Button onClick={() => navigate(`/challenges/${urlId}/commit`)}>
            Commit to this Challenge
          </Button>
          <EditChallenge
            isOpen={isOpen}
            onClose={onClose}
            challenge={challenge}
          />
        </>
      )}
    </>
  );
};

export default SingleChallenge;
