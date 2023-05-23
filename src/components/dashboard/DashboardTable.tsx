import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { Database } from "../../utils/supabaseTypes";
import DashboardTableRow from "./DashboardTableRow";
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
  const [availableRewards, setAvailableRewards] = useState<
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
    //grabbing all commitments for auth user
    const fetchCommitments = async () => {
      await dispatch(fetchAllCommitmentsAsync(currentUser.id));
      setCommitmentsFetched(true); // after fetching set state to true
    };
    fetchCommitments();
    //set current hour
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
    const currentHour = checkTime();
    setHour(currentHour);
  }, [dispatch, currentUser.id]);

  //filter all commitments to see which are already clicked
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

  //running the above filter once all commitments have been fetched
  useEffect(() => {
    if (commitmentsFetched) {
      checkClickedCommitments();
    }
  }, [commitmentsFetched, checkClickedCommitments]);

  //fetch the earned rewards for the auth user
  useEffect(() => {
    const fetchRewards = async () => {
      await dispatch(fetchAllEarnedRewardsAsync(currentUser.id));
    };

    fetchRewards();
  }, [dispatch, commitmentCompleted, currentUser.id]);

  useEffect(() => {
    //filtering rewards into state if they're redeemed
    const foundAvailableRewards = earnedRewards.reduce((result, reward) => {
      if (reward.commitment_id && !reward.is_redeemed) {
        result[reward.commitment_id] = true;
      }
      return result;
    }, {} as Record<string, boolean>);
    setAvailableRewards(foundAvailableRewards);
  }, [earnedRewards]);

  const handleCommitmentComplete = (commitmentId: number) => {
    // debugger;
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

  //set current tab based on hour to be active
  useEffect(() => {
    if (hour > 3 && hour < 12) setTabIndex(0);
    if (hour > 11 && hour < 20) setTabIndex(1);
    if (hour < 4 || hour > 19) setTabIndex(2);
  }, [hour]);

  const handleRedeemReward = async (commitmentId: number) => {
    const commitment = commitments.find(
      (commitment) => commitment.id === commitmentId,
    );
    if (commitment) {
      // Filter for all the unredeemed earned_rewards
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
      title: "Reward redeemed!",
      duration: 5000,
      isClosable: true,
    });
    //refresh availableRewards in state
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
        <DashboardTableRow
          key={commitment.id}
          commitment={commitment}
          checkedCommitments={checkedCommitments}
          handleCommitmentComplete={handleCommitmentComplete}
          availableRewards={availableRewards}
          handleRedeemReward={handleRedeemReward}
        />,
      );
    }
  });

  return (
    <>
      <Box
        id="dashboard-table"
        h="calc(100vh - 258px)"
        p="10px"
        border="1px solid lightgray"
        borderRadius="4px"
        overflow="auto"
      >
        <Tabs defaultIndex={tabIndex}>
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
        {<pre>{JSON.stringify(checkedCommitments, null, 2)}</pre>}
        {<pre>{JSON.stringify(availableRewards, null, 2)}</pre>}
      </Box>
    </>
  );
};

export default DashboardTable;
