import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { Database } from "../../utils/supabaseTypes";
import CommitmentButton from "./CommitmentButton";
import {
  fetchAllCommitmentsAsync,
  selectCommitments,
} from "./challenges/commitments/allCommitmentsSlice";
import { editCommitmentAsync } from "./challenges/commitments/singleCommitmentSlice";
import {
  fetchAllEarnedRewardsAsync,
  postNewEarnedRewardAsync,
  selectEarnedRewards,
  updateEarnedRewardAsync,
} from "./profile/allEarnedRewardsSlice";

interface DashboardTableProps {
  commitments: Database["public"]["Tables"]["commitments"]["Row"][];
}

const DashboardTable = ({ commitments }: DashboardTableProps) => {
  const [checkedCommitments, setCheckedCommitments] = useState<
    Record<string, boolean>
  >({});
  const [redeemedRewards, setRedeemedRewards] = useState<
    Record<string, boolean>
  >({});
  const dispatch = useAppDispatch();
  const fetchedCommitments = useAppSelector(selectCommitments);
  const earnedRewards = useAppSelector(selectEarnedRewards);
  const [commitmentsFetched, setCommitmentsFetched] = useState(false);
  const [commitmentCompleted, setCommitmentCompleted] = useState(false);
  const [hour, setHour] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const toast = useToast();

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
      await dispatch(fetchAllEarnedRewardsAsync(currentUser.id));
    };

    fetchRewards();
  }, [dispatch, commitmentCompleted, currentUser.id]);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const options: any = {
        timeZone: "America/New_York",
        hour12: false,
        hour: "2-digit",
      };
      const easternTime = now.toLocaleString("en-US", options);
      return parseInt(easternTime);
    };
    setHour(checkTime());
    if (hour > 3 && hour < 12) setTabIndex(0);
    if (hour > 11 && hour < 20) setTabIndex(1);
    if (hour < 4 || hour > 19) setTabIndex(2);
    const redeemedRewards = earnedRewards.reduce((result, reward) => {
      if (reward.commitment_id && reward.is_redeemed) {
        result[reward.commitment_id] = true;
      }
      return result;
    }, {} as Record<string, boolean>);
    setRedeemedRewards(redeemedRewards);
  }, [earnedRewards]);

  const handleCommitmentComplete = (commitmentId: number) => {
    setCommitmentCompleted((prevState) => !prevState);
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
    const commitment = commitments.find(
      (commitment) => commitment.id === commitmentId,
    );
    if (commitment) {
      // Fetch all the unredeemed earned_rewards
      const unredeemedRewards = earnedRewards.filter(
        (reward) =>
          reward.commitment_id === commitment.id && !reward.is_redeemed,
      );
      // If there's at least one unredeemed reward, redeem it
      if (unredeemedRewards.length > 0) {
        const earnedReward = unredeemedRewards[0];
        dispatch(
          updateEarnedRewardAsync({
            id: earnedReward.id,
            is_redeemed: true,
            user_id: currentUser.id,
            date_redeemed: new Date().toISOString(),
          }),
        );
      }
    }
    toast({
      title: "Reward Redeemed!",
      duration: 5000,
      isClosable: true,
    });
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
            <Flex justifyContent="center">
              <CommitmentButton
                commitmentId={commitment.id}
                isCompleted={checkedCommitments[commitment.id] || false}
                markAsComplete={handleCommitmentComplete}
                commitmentName={commitment.challenge.name}
              />
            </Flex>
          </Td>
          {commitment.reward_id && (
            <Td>
              <Flex justifyContent="center" alignItems="center">
                <Button
                  isDisabled={
                    !checkedCommitments[commitment.id] ||
                    redeemedRewards[commitment.id]
                  }
                  onClick={() => handleRedeemReward(commitment.id)}
                  colorScheme={
                    !checkedCommitments[commitment.id] ||
                    redeemedRewards[commitment.id]
                      ? "gray"
                      : "yellow"
                  }
                  height="150px"
                  width="150px"
                >
                  {commitment.reward.name.toUpperCase()}
                </Button>
                {/* <IconButton
                  aria-label="Redeem"
                  icon={<MdRedeem />}
                  colorScheme="blue"
                  isDisabled={
                    !checkedCommitments[commitment.id] ||
                    redeemedRewards[commitment.id]
                  }
                  onClick={() => handleRedeemReward(commitment.id)}
                /> */}
              </Flex>
            </Td>
          )}
        </Tr>,
      );
    }
  });

  return (
    <>
      <Box>
        <Tabs defaultIndex={tabIndex}>
          <TabList justifyContent="center" alignItems="center">
            <Tab isDisabled={hour < 4 || hour > 11}>Morning</Tab>
            <Tab isDisabled={hour < 12 || hour > 19}>Afternoon</Tab>
            <Tab isDisabled={hour < 20 || hour > 3}>Night</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign="center">Commitment</Th>
                    <Th textAlign="center">Reward</Th>
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
                  </Tr>
                </Thead>
                <Tbody>{commitmentCategories["4"]}</Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {JSON.stringify(hour)}
    </>
  );
};

export default DashboardTable;
