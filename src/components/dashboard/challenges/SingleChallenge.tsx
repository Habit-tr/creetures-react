import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../utils/reduxHooks";
import EditChallenge from "./EditChallenge";

const SingleChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<any>({});
  const [category, setCategory] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleChallengeAsync({ id }));
    // async function fetchSingleChallenge(id: string) {
    // const { data: fetchedChallenge } = await supabase
    //   .from("challenges")
    //   .select()
    //   .match({ id })
    //   .single();
    // setChallenge(fetchedChallenge);
    // const res = await supabase
    //   .from("categories")
    //   .select("name")
    //   .eq("id", fetchedChallenge?.category_id)
    //   .single();
    // setCategory(res.data?.name ?? "");
    // }
    // fetchSingleChallenge(id!);
  }, [id]);

  return challenge && category ? (
    <>
      <Heading>{challenge.name}</Heading>
      <Text>
        Category:&nbsp;&nbsp;
        <Link to={`/challenges/categories/${category}`}>{category}</Link>
      </Text>
      <Button bgColor="purple.200" onClick={onOpen}>
        Edit Challenge
      </Button>
      <Button onClick={() => navigate(`/challenges/${id}/commit`)}>
        Commit to this Challenge
      </Button>
      <EditChallenge isOpen={isOpen} onClose={onClose} challenge={challenge} />
    </>
  ) : null;
};

export default SingleChallenge;
