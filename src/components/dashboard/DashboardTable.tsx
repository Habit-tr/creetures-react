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
} from "@chakra-ui/react";
import { Database } from "../../utils/supabaseTypes";


interface DashboardTableProps {
  commitments: Database['public']['Tables']['commitments']['Row'][];
}

const DashboardTable = ({ commitments }: DashboardTableProps) => {
  //M T W H F S U
  const date = new Date();
  const dateString = date.toLocaleDateString();

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
        <Flex key={commitment.id} align="center" mb={2}>
          <Checkbox colorScheme="green"/>
          <Text>{commitment.challenge.name}</Text>
        </Flex>
      );
    }
  });


  return (
    <>
      <Box>
        <Text>{dateString}</Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Morning (4am-12pm)</Th>
              <Th>Afternoon (12pm-8pm)</Th>
              <Th>Night (8pm-4am)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{commitmentCategories['Morning (4am-12pm)']}</Td>
              <Td>{commitmentCategories['Afternoon (12pm-8pm)']}</Td>
              <Td>{commitmentCategories['Night (8pm-4am)']}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default DashboardTable;
