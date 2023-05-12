import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../utils/reduxHooks";
import supabase from "../../../../utils/supabaseClient";
import AddCategory from "./AddCategory";
import { deleteCategoryAsync } from "./allCategoriesSlice";

const AllCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const toast = useToast();
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select();
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const { data } = await dispatch(deleteCategoryAsync(id));
    if (data.id) {
      toast({
        title: "Category deleted.",
      });
    } else {
      toast({
        status: "error",
        title: "Delete request failed.",
      });
    }
    // navigate("/challenges");
  };

  return (
    <>
      <Heading as="h1">Categories</Heading>
      <AddCategory />
      {categories && categories.length
        ? categories.map((category) => (
            <Flex mb="10px">
              <Link
                to={`/challenges/categories/${category.name}`}
                key={category.id}
              >
                <Text as="h2" size="md">
                  {category.name}
                </Text>
              </Link>{" "}
              {/* don't display this if there are committed users */}
              <Button
                size="xs"
                p="2px"
                bgColor="red.200"
                m="10px"
                onClick={() => handleDelete(category.id)}
              >
                DELETE
              </Button>
            </Flex>
          ))
        : null}
    </>
  );
};

export default AllCategories;
