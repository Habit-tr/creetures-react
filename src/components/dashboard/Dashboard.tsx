import { Heading, Table, Th, Thead } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AllChallenges from "./challenges/AllChallenges";
import Profile from "./profile/Profile";

const Dashboard = () => {
  return (
    <div>
      <Heading>Dashboard</Heading>
      <Table>
        <Thead>
          <Th>
            <Link to="/profile">
              <Profile />
            </Link>
          </Th>
          <Th>
            <Link to="/challenges">
              <AllChallenges />
            </Link>
          </Th>
        </Thead>
      </Table>
    </div>
  );
};

export default Dashboard;
