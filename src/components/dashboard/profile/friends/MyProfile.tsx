import { useAuth } from "../../../../context/AuthContext";
import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Heading>Profile</Heading>
      Email: {`${currentUser.email}`}
      <Link to="/commitments">
        <Button m="20px">VIEW MY COMMITMENTS</Button>
      </Link>
    </div>
  );
};

export default Profile;
