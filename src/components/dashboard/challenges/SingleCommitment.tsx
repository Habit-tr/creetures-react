import { Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "../../../utils/supabaseClient";

const SingleCommitment = () => {
  const { id } = useParams();

  // REFERENCE: SingleChallenge component
  // const [challenge, setChallenge] = useState<any>({});
  // const [category, setCategory] = useState<string>("");

  // const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchSingleChallenge(id: string) {
  //     const { data: fetchedChallenge } = await supabase
  //       .from("challenges")
  //       .select()
  //       .match({ id })
  //       .single();
  //     setChallenge(fetchedChallenge);
  //     const res = await supabase
  //       .from("categories")
  //       .select("name")
  //       .eq("id", fetchedChallenge?.category_id)
  //       .single();
  //     setCategory(res.data?.name ?? "");
  //   }
  //   fetchSingleChallenge(id!);
  // }, [id]);

  // return challenge && category ? (
  //   <>
  //     <Heading>{challenge.name}</Heading>
  //     <Text>
  //       Category:&nbsp;&nbsp;
  //       <Link to={`/challenges/categories/${category}`}>{category}</Link>
  //     </Text>
  //     <Button onClick={() => navigate("/challenges/1/commit")}>
  //       Commit to this Challenge
  //     </Button>
  //     {/* "Commit" button links to commit form modal */}
  //   </>
  // ) : null;

  return <Heading>Single Commitment #{id}</Heading>
};

export default SingleCommitment;
