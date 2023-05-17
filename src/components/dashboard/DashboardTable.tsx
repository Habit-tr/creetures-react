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
  Flex,
  Button,
} from "@chakra-ui/react";
import { Database } from "../../utils/supabaseTypes";
import { useState } from 'react';


interface DashboardTableProps {
  commitments: Database['public']['Tables']['commitments']['Row'][];
}

const DashboardTable = ({ commitments }: DashboardTableProps) => {

  const [visibleTable, setVisibleTable] = useState<'Morning (4am-12pm)' | 'Afternoon (12pm-8pm)' | 'Night (8pm-4am)'>('Morning (4am-12pm)');

  const getCurrentDay = () => {
    const date = new Date();
    const daysOfWeek = ['U', 'M', 'T', 'W', 'H', 'F', 'S'];
    return daysOfWeek[date.getDay()];
  }

  const checkDay = (commitment: Database['public']['Tables']['commitments']['Row']) => {
    const today = getCurrentDay();
    if (commitment.frequency.indexOf(today) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  const commitmentCategories: Record<'Morning (4am-12pm)' | 'Afternoon (12pm-8pm)' | 'Night (8pm-4am)', JSX.Element[]> = {
    'Morning (4am-12pm)': [],
    'Afternoon (12pm-8pm)': [],
    'Night (8pm-4am)': [],
  };

  commitments.forEach((commitment) => {
    const committedToday = checkDay(commitment);
    const timeframe = commitment.timeframe as 'Morning (4am-12pm)' | 'Afternoon (12pm-8pm)' | 'Night (8pm-4am)';
    if (commitmentCategories.hasOwnProperty(timeframe) && committedToday) {
      commitmentCategories[timeframe].push(
        <Tr key={commitment.id}>
          <Td>
            <Flex>
              <Checkbox colorScheme="green" />
              <Text textAlign="center">{commitment.challenge.name}</Text>
            </Flex>
          </Td>
          {commitment.reward_id
          ? <Td>
              <Flex>
                <Text textAlign="center">{commitment.reward.name}</Text>
                <Button>Redeem</Button>
              </Flex>
            </Td>
          : <Text>No Reward for this commitment</Text>}
        </Tr>
      );
    }
  });


  return (
    <>
      <Box>
        <Flex width="100%" justifyContent="space-between">
          <Button onClick={() => setVisibleTable('Morning (4am-12pm)')}>Morning</Button>
          <Button onClick={() => setVisibleTable('Afternoon (12pm-8pm)')}>Afternoon</Button>
          <Button onClick={() => setVisibleTable('Night (8pm-4am)')}>Night</Button>
        </Flex>
        <Table key={visibleTable}>
          <Thead>
            <Tr>
              <Th textAlign="center">Commitment</Th>
              <Th textAlign="center">Rewards</Th>
            </Tr>
          </Thead>
          <Tbody>
            {commitmentCategories[visibleTable]}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default DashboardTable;
