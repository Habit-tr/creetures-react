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
import { useAuth } from "../../../context/AuthContext";
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
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [isShowingAll, setIsShowingAll] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const fetchedChallenges = useAppSelector(selectChallenges);
  const { session } = useAuth();
  const user = session.session.user;

  useEffect(() => {
    // console.log("refetching");
    dispatch(fetchAllChallengesAsync());
  }, [dispatch]);

  const fetchedCategories = useAppSelector(selectCategories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        dispatch(fetchAllCategoriesAsync());
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    setChallenges(fetchedChallenges);
    setAllCategories(fetchedCategories);
  }, [fetchedCategories, fetchedChallenges]);

  useEffect(() => {
    setFilteredChallenges(fetchedChallenges);
    setIsShowingAll(true);
  }, [fetchedChallenges]);

  const filterChallenges = (challenges: Challenge[]) => {
    debugger;
    //build a new array of all possible challenges
    setChallenges(fetchedChallenges);
    setFilteredChallenges(fetchedChallenges);
    let newlyFilteredChallenges = [...fetchedChallenges];

    //filter by category if needed
    if (selectedCategoryId > 0) {
      console.log("before category sort: ", newlyFilteredChallenges);
      newlyFilteredChallenges = newlyFilteredChallenges.filter(
        (challenge) => challenge.category_id === selectedCategoryId,
      );
      console.log("after category sort: ", newlyFilteredChallenges);
    }
    //filter out the non-owned ones if needed
    if (isShowingAll) {
      console.log("before mine sort: ", newlyFilteredChallenges);
      newlyFilteredChallenges = newlyFilteredChallenges.filter(
        (challenge) => challenge.created_by === user.id,
      );
      console.log("after mine sort: ", newlyFilteredChallenges);
    }
    console.log("final after all sorting: ", newlyFilteredChallenges);
    setFilteredChallenges(newlyFilteredChallenges);
  };
  // filterChallenges(challenges);

  return (
    <>
      <Heading>All Challenges</Heading>
      <Box>isShowingAll: {JSON.stringify(isShowingAll)}</Box>
      <Box>categoryToDisplay: {JSON.stringify(selectedCategoryId)}</Box>
      <Flex justifyContent="space-evenly">
        <Box>
          <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
            Create Challenge
          </Button>
        </Box>
        <Box>
          <Checkbox
            isChecked={!isShowingAll}
            onChange={() => {
              setIsShowingAll(!isShowingAll);
              filterChallenges(challenges);
            }}
          >
            Only My Challenges
          </Checkbox>
        </Box>
        <Box>
          <Select
            value={selectedCategoryId}
            onChange={(e) => {
              console.log("clicked Id is ", e.target.value);
              setSelectedCategoryId(parseInt(e.target.value));
              filterChallenges(challenges);
            }}
          >
            <option key={0} value={0}>
              All Categories
            </option>
            {allCategories &&
              allCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} {category.id}
                </option>
              ))}
          </Select>
        </Box>
      </Flex>
      {filteredChallenges && filteredChallenges.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {filteredChallenges.map((challenge, id) => {
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
