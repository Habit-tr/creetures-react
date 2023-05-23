import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import supabase from "../../utils/supabaseClient";
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
  const [username, setUsername] = useState<any>("USERNAME");

  const commitments = useAppSelector(selectCommitments);

  useEffect(() => {
    dispatch(fetchAllCommitmentsAsync(currentUser.id));
    const fetchUsername = async () => {
      let { data: fetchedUsername } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", currentUser.id);
      fetchedUsername && setUsername(fetchedUsername[0].username);
    };
    fetchUsername();
  }, [dispatch, currentUser]);

  const checkTime = () => {
    const now = new Date();
    const options: any = {
      timeZone: "America/New_York",
      hour12: false,
      hour: "2-digit",
    };
    const easternTime = parseInt(now.toLocaleString("en-US", options));
    if (easternTime > 19 || easternTime < 4) return "EVENING";
    if (easternTime > 11 && easternTime < 20) return "AFTERNOON";
    if (easternTime > 3 && easternTime < 12) return "MORNING";
  };
  const welcomeString = `GOOD ${checkTime()}, ${username}!`;
  return (
    <>
      <Flex direction="row" flexWrap="wrap">
        <Box w="50%" minW="370px" p="10px">
          <Heading size="md" mb="20px" color="black">
            {welcomeString.toUpperCase()}
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
        <Box w="50%" minW="370px" padding="10px">
          <Heading size="md" mb="20px" color="purple.500" textAlign="center">
            FELLOW CREETURES OF HABIT
          </Heading>
          <FriendsSidebar />
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
