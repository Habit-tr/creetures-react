import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Flex, Heading, Text, Box, Spacer, HStack, Button } from '@chakra-ui/react';

const MyProfile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Heading>My Profile</Heading>
      Email: {`${currentUser.email}`}
      <Link to="/commitments">
        <Button m="20px">VIEW MY COMMITMENTS</Button>
      </Link>
    </div>
  );
};

export default MyProfile;
