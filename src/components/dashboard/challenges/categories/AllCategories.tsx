import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
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


  return (
    <>
      <Heading as="h1">Categories</Heading>
      <Flex>
        <Box width="50%" margin="20px">
          {" "}
          <AddCategory />
        </Box>
        <Box width="50%" margin="20px">
          <Heading size="md" mb="20px">
            All Categories:
          </Heading>
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
                </Flex>
              ))
            : null}
        </Box>
      </Flex>
    </>
  );
};

export default AllCategories;
