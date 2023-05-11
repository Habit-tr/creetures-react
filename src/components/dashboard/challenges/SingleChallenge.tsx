import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import EditChallenge from "./EditChallenge";
import {
  fetchSingleChallengeAsync,
  selectChallenge,
} from "./singleChallengeSlice";

const SingleChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchedChallenge = useAppSelector(selectChallenge);

  useEffect(() => {
    const fetchChallenge = async () => {
      await dispatch(fetchSingleChallengeAsync({ id }));
      setChallenge(fetchedChallenge);
    };
    fetchChallenge();
  }, []); //need to figure out this dependency array

  return (
    <>
      <Heading>{challenge.name}</Heading>
      {challenge && challenge.id && (
        <>
          <Text>
            Category:&nbsp;&nbsp;
            <Link to={`/challenges/categories/${challenge.category.name}`}>
              {challenge.category.name}
            </Link>
          </Text>
          <Button bgColor="purple.200" onClick={onOpen}>
            Edit Challenge
          </Button>
          <Button onClick={() => navigate(`/challenges/${id}/commit`)}>
            Commit to this Challenge
          </Button>
        </>
      )}
      <EditChallenge isOpen={isOpen} onClose={onClose} challenge={challenge} />
    </>
  );
};

export default SingleChallenge;
