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
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { Challenge } from "../../../utils/supabaseTypes";
import AddChallenge from "./AddChallenge";
import ChallengeCard from "./ChallengeCard";
import {
  fetchAllChallengesAsync,
  selectChallenges,
} from "./allChallengesSlice";
import {
  fetchAllCategoriesAsync,
  selectCategories,
} from "./categories/allCategoriesSlice";

const AllChallenges = () => {
  // const [challenges, setChallenges] = useState<Challenge[]>([]);

  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  // const [allCategories, setAllCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [isShowingAll, setIsShowingAll] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const { session } = useAuth();
  const user = session.session.user;
  const navigate = useNavigate();

  // useEffect(() => {
  //   // console.log("fetching");
  //   // dispatch(fetchAllChallengesAsync());
  // }, [dispatch, isOpen]);

  // useEffect(() => {
  //   // async function fetchCategories() {
  //   //   try {
  //   //     dispatch(fetchAllCategoriesAsync());
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //   }
  //   // }
  //   // fetchCategories();
  // }, [dispatch]);

  const challenges = useAppSelector(selectChallenges);
  const allCategories = useAppSelector(selectCategories);

  useEffect(() => {
    console.log("fetching");
    dispatch(fetchAllChallengesAsync());
    async function fetchCategories() {
      try {
        dispatch(fetchAllCategoriesAsync());
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [dispatch]);

  // useEffect(() => {
  //   setChallenges(fetchedChallenges);
  //   setAllCategories(fetchedCategories);
  // }, [fetchedCategories, fetchedChallenges]);

  useEffect(() => {
    console.log("is filtering");
    setFilteredChallenges(challenges);
    setIsShowingAll(true);
  }, [challenges]);

  const filterChallenges = (challenges: Challenge[]) => {
    // debugger;
    //build a new array of all possible challenges
    let newlyFilteredChallenges = [...challenges];

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
            colorScheme="purple"
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
            + Challenge
          </Button>
          {/* adding a category feels like admin only stuff */}
          <Button
            margin="10px"
            bgColor="purple.200"
            onClick={() => navigate("/challenges/categories")}
          >
            + Category
          </Button>
        </Box>
      </Flex>
      {filteredChallenges && filteredChallenges.length ? (
        <Flex direction="row" maxW="900px" wrap="wrap">
          {filteredChallenges.map((challenge, id) => {
            return (
              <ChallengeCard
                key={id}
                user={user}
                challenge={challenge}
                category={allCategories?.find(
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
