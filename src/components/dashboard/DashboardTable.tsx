import {
  Box,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdRedeem } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { Database } from "../../utils/supabaseTypes";
import CommitmentButton from "./CommitmentButton";
import {
  fetchAllCommitmentsAsync,
  selectCommitments,
} from "./challenges/commitments/allCommitmentsSlice";
import { editCommitmentAsync } from "./challenges/commitments/singleCommitmentSlice";
import { fetchAllEarnedRewardsAsync, selectEarnedRewards, updateEarnedRewardAsync, postNewEarnedRewardAsync } from "./profile/allEarnedRewardsSlice";

interface DashboardTableProps {
  commitments: Database["public"]["Tables"]["commitments"]["Row"][];
}

const DashboardTable = ({ commitments }: DashboardTableProps) => {
  const [checkedCommitments, setCheckedCommitments] = useState<
    Record<string, boolean>
  >({});
  const dispatch = useAppDispatch();
  const fetchedCommitments = useAppSelector(selectCommitments);
  const earnedRewards = useAppSelector(selectEarnedRewards);
  const [commitmentsFetched, setCommitmentsFetched] = useState(false);
  const [commitmentCompleted, setCommitmentCompleted] = useState(false);

  const { currentUser } = useAuth();


  useEffect(() => {
    const fetchCommitments = async () => {
      await dispatch(fetchAllCommitmentsAsync(currentUser.id));
      setCommitmentsFetched(true); // after fetching set state to true
    };

    fetchCommitments();
  }, [dispatch, currentUser.id]);

  const checkClickedCommitments = useCallback(() => {
    const clickedCommitments = fetchedCommitments.filter(
      (commitment) => commitment.is_clicked,
    );
    clickedCommitments.forEach((commitment) => {
      setCheckedCommitments((prevState) => ({
        ...prevState,
        [commitment.id]: true,
      }));
    });
  }, [fetchedCommitments]);

  useEffect(() => {
    if (commitmentsFetched) {
      checkClickedCommitments();
    }
  }, [commitmentsFetched, checkClickedCommitments]);

  useEffect(() => {
    const fetchRewards = async () => {
      await dispatch(fetchAllEarnedRewardsAsync());
    };

    fetchRewards();
  }, [dispatch, commitmentCompleted]);


  const handleCommitmentComplete = (commitmentId: number) => {
    setCommitmentCompleted(prevState => !prevState);
    setCheckedCommitments((prevChecked) => ({
      ...prevChecked,
      [commitmentId]: true,
    }));
    const commitment = commitments.find(
      (commitment) => commitment.id === commitmentId,
    );
    if (commitment && commitment.reward_id) {
      dispatch(
        postNewEarnedRewardAsync({
          commitment_id: commitment.id,
          reward_id: commitment.reward_id,
          user_id: currentUser.id,
        }),
      );
    }
    if (commitment) {
      dispatch(
        editCommitmentAsync({
          id: commitmentId,
          is_clicked: true,
          xp_counters: commitment.xp_counters + 1,
        }),
      );
    }
  };

  const handleRedeemReward = async (commitmentId: number) => {
    // console.log(`button clicked for ${commitmentId}`)
    const commitment = commitments.find(
      (commitment) => commitment.id === commitmentId,
    );
    // console.log('commitment:', commitment);
    if (commitment) {
      // Fetch the corresponding earned_reward
      const earnedReward = earnedRewards.find(
        (reward) => reward.commitment_id === commitment.id,
      );
      // console.log(earnedRewards);
      // console.log('earnedReward: ', earnedReward);
      if (earnedReward) {
        // console.log('Found earnedReward, dispatching action...');
        // console.log(earnedReward.id);
        dispatch(
          updateEarnedRewardAsync({
            id: earnedReward.id,
            is_redeemed: true,
            user_id: currentUser.id,
          })
        );
      }
    }
  };


  const getCurrentDay = () => {
    const date = new Date();
    return String(date.getDay());
  };

  const checkDay = (
    commitment: Database["public"]["Tables"]["commitments"]["Row"],
  ) => {
    const today = getCurrentDay();
    if (commitment.frequency.includes(today)) {
      return true;
    } else {
      return false;
    }
  };

  const commitmentCategories: Record<"12" | "20" | "4", JSX.Element[]> = {
    "12": [],
    "20": [],
    "4": [],
  };

  commitments?.forEach((commitment) => {
    const committedToday = checkDay(commitment);
    const timeframe = commitment.timeframe as "12" | "20" | "4";
    if (commitmentCategories.hasOwnProperty(timeframe) && committedToday) {
      commitmentCategories[timeframe].push(
        <Tr key={commitment.id}>
          <Td>
            <Flex>
              <CommitmentButton
                commitmentId={commitment.id}
                isCompleted={checkedCommitments[commitment.id] || false}
                markAsComplete={handleCommitmentComplete}
              />
              <Text textAlign="center">{commitment.challenge.name}</Text>
            </Flex>
          </Td>
          {commitment.reward_id && (
            <Td>
              <Text textAlign="center">{commitment?.reward?.name}</Text>
            </Td>
          )}
          <Td>
            <Flex justifyContent="center" alignItems="center">
              <IconButton
                aria-label="Redeem"
                icon={<MdRedeem />}
                colorScheme="blue"
                isDisabled={!checkedCommitments[commitment.id]}
                onClick={() => handleRedeemReward(commitment.id)}
              />
            </Flex>
          </Td>
        </Tr>,
      );
    }
  });

  return (
    <>
      <Box>
        <Tabs>
          <TabList justifyContent="center" alignItems="center">
            <Tab>Morning</Tab>
            <Tab>Afternoon</Tab>
            <Tab>Night</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Commitment</Th>
                    <Th textAlign="center">Reward</Th>
                    <Th textAlign="center">Redeem</Th>
                  </Tr>
                </Thead>
                <Tbody>{commitmentCategories["12"]}</Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Commitment</Th>
                    <Th textAlign="center">Reward</Th>
                    <Th textAlign="center">Redeem</Th>
                  </Tr>
                </Thead>
                <Tbody>{commitmentCategories["20"]}</Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Commitment</Th>
                    <Th textAlign="center">Reward</Th>
                    <Th textAlign="center">Redeem</Th>
                  </Tr>
                </Thead>
                <Tbody>{commitmentCategories["4"]}</Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default DashboardTable;
