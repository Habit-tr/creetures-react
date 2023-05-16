import { Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import EditCategory from "./EditCategory";
import { deleteCategoryAsync } from "./allCategoriesSlice";
import {
  fetchSingleCategoryAsync,
  selectCategory,
} from "./singleCategorySlice";

const SingleCategory = () => {
  const { id } = useParams();
  // const [categoryChallenges, setCategoryChallenges] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const category: any = useAppSelector(selectCategory);
  const challenges = category.challenges;
  // setCategoryChallenges(category.challenges);

  useEffect(() => {
    console.log("fetching a single category and its challenges");
    const fetchCategoryData = async (id: number) => {
      const fetchedCategoryData = await dispatch(fetchSingleCategoryAsync(id));
      return fetchedCategoryData;
    };
    fetchCategoryData(parseInt(id!));
  }, [dispatch, id]);

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
        [{category.name?.toUpperCase()}] Challenges:{" "}
        {challenges && challenges.length}
      </Heading>
      {challenges && challenges.length ? (
        challenges.map((challenge: any) => (
          <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
            <Text>{challenge.name}</Text>
          </Link>
        ))
      ) : (
        <>
          <EditCategory category={category} />
          <Button
            bgColor="red.200"
            m="10px"
            onClick={() => handleDelete(category.id!)}
          >
            DELETE
          </Button>
        </>
      )}
    </>
  );
};

export default SingleCategory;
