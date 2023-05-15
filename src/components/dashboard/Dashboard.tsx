import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Reaction from "./profile/AllReactions";
import SideBar from "./components/sideBar";

const Dashboard = () => {
  const [user, setUser] = useState({ email: "" });
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    const fetchedUser = session.session.user;
    setUser(fetchedUser);
  }, [session.session.user]);

  return (
    <>
      <Heading>Welcome, {user && user.email}!</Heading>
      <Text fontSize="20px">It's a beautiful day for a new habit!</Text>
      <Flex direction="row" flexWrap="wrap">
        <SideBar>
          
        </SideBar>
        <Box
          w="550px"
          h="300px"
          border="2px black solid"
          margin="20px"
          padding="5px"
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
          <Text>
            Display a mini battle pass view here with today's commitments and
            rewards and maybe also tomorrow's.
          </Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Fri</Th>
                <Th>Sat</Th>
                <Th>Sun</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Chew Gum</Td>
                <Td>Practice Yoga</Td>
                <Td>Update Resume</Td>
              </Tr>
              <Tr>
                <Td>Jaw Massage</Td>
                <Td>New Mat</Td>
                <Td>30-min Selfie Session</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Box
          w="275px"
          h="300px"
          border="2px black solid"
          margin="20px"
          padding="5px"
        >
          <Heading
            size="md"
            mb="20px"
            color="purple.500"
            cursor="pointer"
            onClick={() => navigate("/friends")}
          >
            FELLOW CREETURES
          </Heading>
          <Text mb="10px">
            Sort top friends by # of shared challenges commited to. Show avatar,
            most recent check-in, highfives and nudges.
          </Text>
          <Text mb="10px">Andrew nudged Ben!</Text>
          <Text mb="10px">Jack high-fived Simin!</Text>
          <Text mb="10px">Danny committed to a new challenge!</Text>
          <Reaction />
        </Box>

      </Flex>
    </>
  );
};

export default Dashboard;
