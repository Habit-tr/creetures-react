import { Button, Heading } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
const Profile = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Heading>Profile</Heading>
      Email: {`${currentUser.email}`}
      <Button>Log Out</Button>
    </div>
  );
};

export default Profile;
