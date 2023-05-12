import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { Challenge } from "../../../utils/supabaseTypes";
import AddChallenge from "./AddChallenge";
import ChallengeCard from "./ChallengeCard";
import {
  fetchAllCategoriesAsync,
  selectCategories,
} from "./allCategoriesSlice";
import {
  fetchAllChallengesAsync,
  selectChallenges,
} from "./allChallengesSlice";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>(0);
  const [isFilteringMine, setIsFilteringMine] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const fetchedChallenges = useAppSelector(selectChallenges);

  useEffect(() => {
    dispatch(fetchAllChallengesAsync());
    setChallenges(fetchedChallenges);
  }, [dispatch, fetchedChallenges]);

  const fetchedCategories = useAppSelector(selectCategories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        dispatch(fetchAllCategoriesAsync());
        setAllCategories(fetchedCategories);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [dispatch, fetchedCategories]);

  return (
    <>
      <Heading>All Challenges</Heading>
      <Flex justifyContent="space-evenly">
        <Box>
          <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
            Create Challenge
          </Button>
        </Box>
        <Box>
          <Checkbox
            isChecked={isFilteringMine}
            onChange={() => setIsFilteringMine(!isFilteringMine)}
          >
            Only My Challenges
          </Checkbox>
        </Box>
        <Box>
          <Select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option key={0} value={0}>
              All Categories
            </option>
            {allCategories &&
              allCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Select>
        </Box>
      </Flex>
      {challenges && challenges.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {challenges.map((challenge, id) => {
            return <ChallengeCard key={id} challenge={challenge} />;
          })}
        </Flex>
      ) : null}
      <AddChallenge
        isOpen={isOpen}
        onClose={onClose}
        allCategories={allCategories}
      />
    </>
  );
};

export default AllChallenges;
