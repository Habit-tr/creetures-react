import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Heading>Dashboard</Heading>
      <Link to="/profile">
        <Button m="20px">VIEW MY PROFILE</Button>
      </Link>
      <Link to="/challenges">
        <Button m="20px">VIEW ALL CHALLENGES</Button>
      </Link>
    </>
  );
};

export default Dashboard;
