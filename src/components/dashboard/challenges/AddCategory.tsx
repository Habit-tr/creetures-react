import { Button, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { postNewCategoryAsync } from "./allCategoriesSlice";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await dispatch(postNewCategoryAsync(categoryName));
    navigate("/challenges");
  };
  return (
    <>
      <Heading>Add a New Category:</Heading>
      <Input
        value={categoryName}
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
      ></Input>
      <Button
        bgColor="green.200"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </Button>
    </>
  );
};
export default AddCategory;
