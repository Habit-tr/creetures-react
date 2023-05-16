import { Button, Flex, Heading, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../utils/reduxHooks";
import { Database } from "../../../../utils/supabaseTypes";
import { editCategoryAsync } from "./singleCategorySlice";

interface EditCategoryProps {
  category: Database["public"]["Tables"]["categories"]["Update"];
}

const EditCategory = ({ category }: EditCategoryProps) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    setCategoryName(category.name || "");
  }, [category.name]);

  const handleSubmit = async () => {
    const id = category.id;
    const { data } = await dispatch(editCategoryAsync({ id, categoryName }));
    if (data.name) {
      toast({
        title: "Category updated.",
      });
    } else {
      toast({
        status: "error",
        title: "Unable to update category.",
      });
    }
  };
  return (
    <>
      <Flex direction="column">
        <Heading size="md">Edit Category</Heading>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        ></Input>
      </Flex>
      <Button bgColor="orange.200" onClick={() => handleSubmit()}>
        UPDATE
      </Button>
    </>
  );
};
export default EditCategory;
