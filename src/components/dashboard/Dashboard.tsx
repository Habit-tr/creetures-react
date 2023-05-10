import { Button, Heading, Table, Th, Thead } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Heading>Dashboard</Heading>
      <Table>
        <Thead>
          <Th>
            <Link to="/profile">
              <Button>VIEW MY PROFILE</Button>
            </Link>
          </Th>
          <Th>
            <Link to="/challenges">
              <Button>VIEW ALL CHALLENGES</Button>
            </Link>
          </Th>
        </Thead>
      </Table>
    </>
  );
};

export default Dashboard;
