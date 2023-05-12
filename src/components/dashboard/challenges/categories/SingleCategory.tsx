import { Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../utils/reduxHooks";
import supabase from "../../../../utils/supabaseClient";
import EditCategory from "./EditCategory";
import { deleteCategoryAsync } from "./allCategoriesSlice";

const SingleCategory = () => {
  const { name } = useParams();
  const [categoryChallenges, setCategoryChallenges] = useState<any[]>([]);
  const [fetchedCategory, setFetchedCategory] = useState<any>({});
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    async function fetchChallengesByCategory(name: string) {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .match({ name })
        .single();
      setFetchedCategory(category);

      const { data: challenges } = await supabase
        .from("challenges")
        .select()
        .eq("category_id", category?.id);
      setCategoryChallenges(challenges || []);
    }
    fetchChallengesByCategory(name!);
  }, [name]);

  const handleDelete = async (id: number) => {
    const { data } = await dispatch(deleteCategoryAsync(id));
    if (data.id) {
      toast({
        title: "Category deleted.",
      });
    } else {
      toast({
        status: "error",
        title: "Unable to delete category.",
      });
    }
    // navigate("/challenges");
  };

  return (
    <>
      <Heading as="h1" mb="20px">
        [{name?.toUpperCase()}] Challenges:{" "}
        {categoryChallenges && categoryChallenges.length}
      </Heading>
      {categoryChallenges && categoryChallenges.length ? (
        categoryChallenges.map((challenge) => (
          <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
            <Text>{challenge.name}</Text>
          </Link>
        ))
      ) : (
        <>
          <EditCategory category={fetchedCategory} />
          <Button
            bgColor="red.200"
            m="10px"
            onClick={() => handleDelete(fetchedCategory.id)}
          >
            DELETE
          </Button>
        </>
      )}
    </>
  );
};

export default SingleCategory;
