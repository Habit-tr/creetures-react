import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import DashboardTable from "./DashboardTable";
import FriendsSidebar from "./friends/FriendsSidebar";
import {
  fetchAllCommitmentsAsync,
  selectCommitments,
} from "./challenges/commitments/allCommitmentsSlice";

const Dashboard = () => {
  const [user, setUser] = useState({ email: "" });
  const navigate = useNavigate();
  const { session } = useAuth();
  const dispatch = useAppDispatch();

  const commitments = useAppSelector(selectCommitments);

  useEffect(() => {
    const fetchedUser = session.session.user;
    setUser(fetchedUser);
  }, [session.session.user]);

  useEffect(() => {
    dispatch(fetchAllCommitmentsAsync());
  }, [dispatch]);

  function navigateProf() {
    navigate("/profile");
  }

  return (
    <>
      <Flex justifyContent="space-between">
        <Box>
          <Heading>{user.email}'s Dashboard</Heading>
        </Box>
        <Box>
          <Button bgColor="purple.200" onClick={navigateProf}>
            My Profile
          </Button>
        </Box>
      </Flex>
      <Flex direction="row" flexWrap="wrap">
        <Box
          w="550px"
          h="440px"
          border="2px black solid"
          margin="20px"
          padding="10px"
        >
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
        <FriendsSidebar />
      </Flex>
    </>
  );
};

export default Dashboard;
