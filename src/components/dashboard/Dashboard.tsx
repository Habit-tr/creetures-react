import {
  Box,
  Button,
  Checkbox,
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
import { Link } from "react-router-dom";
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
        <SideBar></SideBar>
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
          <Text>
            Display a mini battle pass view here with today's commitments and
            rewards and maybe also tomorrow's.
          </Text>
          <Link to="/challenges">
            <Text cursor="pointer" margin="20px">
              <Button
                bgColor="green.200"
                color="black"
                onClick={() => navigate("/challenges")}
              >
                Challenges
              </Button>
            </Text>
          </Link>
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
                {/* will map over fetched commitments for auth user */}
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
                {/* will map over fetched rewards for above commitments */}
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
          </Table>
          <Link to="/rewards">
            <Button
              bgColor="yellow.200"
              color="black"
              margin="10px"
              onClick={() => navigate("/rewards")}
            >
              Rewards
            </Button>
          </Link>
        </Box>
        {/* each of these two boxes should be a separate component that gets rendered in this parent component */}
        <Box
          w="275px"
          h="440px"
          border="2px black solid"
          margin="20px"
          padding="10px"
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
