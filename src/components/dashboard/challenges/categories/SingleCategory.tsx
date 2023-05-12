import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../../../utils/supabaseClient";

const SingleCategory = () => {
  const { name } = useParams();
  const [categoryChallenges, setCategoryChallenges] = useState<any[]>([]);

  useEffect(() => {
    async function fetchChallengesByCategory(name: string) {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .match({ name })
        .single();
      const { data: challenges } = await supabase
        .from("challenges")
        .select()
        .eq("category_id", category?.id);
      setCategoryChallenges(challenges || []);
    }
    fetchChallengesByCategory(name!);
  }, [name]);

  return (
    <>
      <Heading as="h1">{name} challenges</Heading>
      {categoryChallenges && categoryChallenges.length
        ? categoryChallenges.map((challenge) => (
            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
              <Text>{challenge.name}</Text>
            </Link>
          ))
        : null}
    </>
  );
};

export default SingleCategory;
