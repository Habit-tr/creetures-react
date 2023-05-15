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
  // const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [showOnlyMine, setShowOnlyMine] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const { session } = useAuth();
  const user = session.session.user;
  const navigate = useNavigate();

  const challenges = useAppSelector(selectChallenges);
  const allCategories = useAppSelector(selectCategories);

  useEffect(() => {
    console.log("fetching");
    async function fetchData() {
      try {
        dispatch(fetchAllCategoriesAsync());
        dispatch(fetchAllChallengesAsync());
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [dispatch]);

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
    if (showOnlyMine) {
      // console.log("before mine sort: ", onceFilteredChallenges);
      onceFilteredChallenges = onceFilteredChallenges.filter(
        (challenge) => challenge.created_by === user.id,
      );
      // console.log("after mine sort: ", onceFilteredChallenges);
    }
    const twiceFilteredChallenges = [...onceFilteredChallenges];
    // console.log("final after all sorting: ", twiceFilteredChallenges);
    return twiceFilteredChallenges;
  };
  const filteredChallenges = filterChallenges(challenges);

  return (
    <>
      <Heading margin="10px">Browse Challenges</Heading>
      <Flex
        margin="10px"
        justifyContent="space-between"
        maxW="900px"
        wrap="wrap"
      >
        <Box>
          <Select
            value={selectedCategoryId}
            margin="5px"
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
          <Checkbox
            isChecked={showOnlyMine}
            colorScheme="purple"
            margin="5px"
            onChange={() => {
              setShowOnlyMine(!showOnlyMine);
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
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
};

export default AllChallenges;
