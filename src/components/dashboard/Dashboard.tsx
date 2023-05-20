import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import DashboardTable from "./DashboardTable";
import {
  fetchAllCommitmentsAsync,
  selectCommitments,
} from "./challenges/commitments/allCommitmentsSlice";
import FriendsSidebar from "./friends/FriendsSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();

  const commitments = useAppSelector(selectCommitments);

  useEffect(() => {
    dispatch(fetchAllCommitmentsAsync(currentUser.id));
  }, [dispatch, currentUser.id]);

  return (
    <>
      <Flex direction="row">
        <Box w="55%" margin="20px" padding="10px">
          <Heading
            size="md"
            mb="20px"
            color="green.500"
            cursor="pointer"
            onClick={() => navigate("/commitments")}
          >
            TODAY'S COMMITMENTS
          </Heading>
          <Flex justifyContent="center" alignItems="center"></Flex>
          <DashboardTable commitments={commitments} />
          {/* <Table>
            <Thead>
              <Tr>
                <Th>Fri</Th>
                <Th>Sat</Th>
                <Th>Sun</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Checkbox colorScheme="green" /> Chew Gum
                </Td>
                <Td>
                  <Checkbox colorScheme="green" /> Practice Yoga
                </Td>
                <Td>
                  <Checkbox colorScheme="green" /> Update Resume
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Checkbox colorScheme="yellow" /> Jaw Massage
                </Td>
                <Td>
                  <Checkbox colorScheme="yellow" /> New Mat
                </Td>
                <Td>
                  <Checkbox colorScheme="yellow" /> 30-min Selfie Session
                </Td>
              </Tr>
            </Tbody>
          </Table> */}
        </Box>
        {/* each of these two boxes should be a separate component that gets rendered in this parent component */}
        <Box w="40%" margin="20px" padding="10px">
          <Heading size="md" mb="20px" color="purple.500">
            FELLOW CREETURES OF HABIT
          </Heading>
          <FriendsSidebar />
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
