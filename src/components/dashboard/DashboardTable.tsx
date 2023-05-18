import {
  Checkbox,
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
import { Link } from "react-router-dom";
import { MdRedeem } from "react-icons/md";
import { Database } from "../../utils/supabaseTypes";
import { useState } from "react";

interface DashboardTableProps {
  commitments: Database["public"]["Tables"]["commitments"]["Row"][];
}

const DashboardTable = ({ commitments }: DashboardTableProps) => {
  const [checkedCommitments, setCheckedCommitments] = useState<Record<string, boolean>>({});

  const getCurrentDay = () => {
    const date = new Date();
    const daysOfWeek = ["U", "M", "T", "W", "H", "F", "S"];
    return daysOfWeek[date.getDay()];
  };

  const checkDay = (commitment: Database["public"]["Tables"]["commitments"]["Row"]) => {
    const today = getCurrentDay();
    if (commitment.frequency.indexOf(today) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckboxChange = (commitmentId: number, isChecked: boolean) => {
    setCheckedCommitments((prevChecked) => ({ ...prevChecked, [commitmentId]: isChecked }));
  };

  const commitmentCategories: Record<"Morning (4am-12pm)" | "Afternoon (12pm-8pm)" | "Night (8pm-4am)", JSX.Element[]> = {
    "Morning (4am-12pm)": [],
    "Afternoon (12pm-8pm)": [],
    "Night (8pm-4am)": [],
  };

  commitments.forEach((commitment) => {
    const committedToday = checkDay(commitment);
    const timeframe = commitment.timeframe as "Morning (4am-12pm)" | "Afternoon (12pm-8pm)" | "Night (8pm-4am)";
    if (commitmentCategories.hasOwnProperty(timeframe) && committedToday) {
      commitmentCategories[timeframe].push(
        <Tr key={commitment.id}>
          <Td>
            <Checkbox
              colorScheme="green"
              onChange={(e) => handleCheckboxChange(commitment.id, e.target.checked)}
            >
              <Text textAlign="center">{commitment.challenge.name}</Text>
            </Checkbox>
          </Td>
          {commitment.reward_id && (
            <Td>
              <Text textAlign="center">{commitment.reward.name}</Text>
            </Td>
          )}
          <Td>
            <Flex justifyContent="center" alignItems="center">
              <Link to={`/rewards/${commitment.reward_id}`}>
                <IconButton
                  aria-label="Redeem"
                  icon={<MdRedeem />}
                  colorScheme="blue"
                  isDisabled={!checkedCommitments[commitment.id]}
                />
              </Link>
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
                <Tbody>{commitmentCategories["Morning (4am-12pm)"]}</Tbody>
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
                <Tbody>{commitmentCategories["Afternoon (12pm-8pm)"]}</Tbody>
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
                <Tbody>{commitmentCategories["Night (8pm-4am)"]}</Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default DashboardTable;

