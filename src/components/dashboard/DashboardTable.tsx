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
  const date = new Date();
  const dateString = date.toLocaleDateString();

  const commitmentCategories: Record<'morning' | 'afternoon' | 'Evening', JSX.Element[]> = {
    morning: [],
    afternoon: [],
    Evening: [],
  };

  commitments.forEach((commitment) => {
    if (commitment.timeframe && commitmentCategories.hasOwnProperty(commitment.timeframe)) {
      const timeframe = commitment.timeframe as 'morning' | 'afternoon' | 'Evening';
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
              <Th>Morning</Th>
              <Th>Afternoon</Th>
              <Th>Evening</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{commitmentCategories.morning}</Td>
              <Td>{commitmentCategories.afternoon}</Td>
              <Td>{commitmentCategories.Evening}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default DashboardTable;