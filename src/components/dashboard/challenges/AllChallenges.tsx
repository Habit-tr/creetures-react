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
  }, [dispatch, isOpen]);

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
    // debugger;
    //build a new array of all possible challenges
    let newlyFilteredChallenges = [...fetchedChallenges];

    //filter by category if needed
    if (selectedCategoryId > 0) {
      // console.log("before category sort: ", newlyFilteredChallenges);
      newlyFilteredChallenges = newlyFilteredChallenges.filter(
        (challenge) => challenge.category_id === selectedCategoryId,
      );
      // console.log("after category sort: ", newlyFilteredChallenges);
    }
    let onceFilteredChallenges = [...newlyFilteredChallenges];
    //filter out the non-owned ones if needed
    if (isShowingAll) {
      // console.log("before mine sort: ", onceFilteredChallenges);
      onceFilteredChallenges = onceFilteredChallenges.filter(
        (challenge) => challenge.created_by === user.id,
      );
      // console.log("after mine sort: ", onceFilteredChallenges);
    }
    const twiceFilteredChallenges = [...onceFilteredChallenges];
    // console.log("final after all sorting: ", twiceFilteredChallenges);
    setFilteredChallenges(twiceFilteredChallenges);
  };

  return (
    <>
      <Heading>All Challenges</Heading>
      {/* <Box>isShowingAll: {JSON.stringify(isShowingAll)}</Box>
      <Box>categoryToDisplay: {JSON.stringify(selectedCategoryId)}</Box> */}
      <Flex justifyContent="space-between" maxW="900px" wrap="wrap">
        <Box>
          <Select
            value={selectedCategoryId}
            onChange={(e) => {
              // console.log("clicked Id is ", e.target.value);
              setSelectedCategoryId(parseInt(e.target.value));
              filterChallenges(challenges);
              setChallenges(fetchedChallenges);
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
          <Button margin="10px" bgColor="purple.200" onClick={onOpen}>
            Create Challenge
          </Button>
        </Box>
      </Flex>
      {filteredChallenges && filteredChallenges.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {filteredChallenges.map((challenge, id) => {
            return (
              <ChallengeCard
                key={id}
                challenge={challenge}
                category={allCategories.find(
                  (category) => category.id === challenge.category_id,
                )}
              />
            );
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
