import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
} from "@chakra-ui/react";
import { MdRedeem } from "react-icons/md";
import { Database } from "../../utils/supabaseTypes";
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import CommitmentButton from "./CommitmentButton";
import { postNewEarnedRewardAsync } from "./profile/allEarnedRewardsSlice";
import { fetchAllCommitmentsAsync, selectCommitments } from "./challenges/commitments/allCommitmentsSlice";
import { editCommitmentAsync } from "./challenges/commitments/singleCommitmentSlice";
import { useAuth } from "../../context/AuthContext";

interface DashboardTableProps {
  commitments: Database["public"]["Tables"]["commitments"]["Row"][];
}

const DashboardTable = ({ commitments }: DashboardTableProps) => {
  const [checkedCommitments, setCheckedCommitments] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  const fetchedCommitments = useAppSelector(selectCommitments);
  const [commitmentsFetched, setCommitmentsFetched] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCommitments = async () => {
      await dispatch(fetchAllCommitmentsAsync(currentUser.id));
      setCommitmentsFetched(true);  // after fetching set state to true
    };

    fetchCommitments();
  }, [dispatch, currentUser.id]);

  const checkClickedCommitments = useCallback(() => {
    const clickedCommitments = fetchedCommitments.filter(commitment => commitment.is_clicked);
    clickedCommitments.forEach((commitment) => {
      setCheckedCommitments((prevState) => ({ ...prevState, [commitment.id]: true}));
    });
  }, [fetchedCommitments]);

  useEffect(() => {
    if(commitmentsFetched) {
      checkClickedCommitments();
    }
  }, [commitmentsFetched, checkClickedCommitments]);

  const handleCommitmentComplete = (commitmentId: number) => {
    setCheckedCommitments((prevChecked) => ({ ...prevChecked, [commitmentId]: true }));
    const commitment = commitments.find(commitment => commitment.id === commitmentId);
    if (commitment && commitment.reward_id) {
      dispatch(postNewEarnedRewardAsync({ commitment_id: commitment.id, reward_id: commitment.reward_id }));
    }
    dispatch(editCommitmentAsync({ id: commitmentId, is_clicked: true }));
  };

  const getCurrentDay = () => {
    const date = new Date();
    return String(date.getDay());
  };

  const checkDay = (commitment: Database["public"]["Tables"]["commitments"]["Row"]) => {
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
    const timeframe = commitment.timeframe as '12' | '20' | '4';
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
              />
            </Flex>
          </Td>
        </Tr>
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
