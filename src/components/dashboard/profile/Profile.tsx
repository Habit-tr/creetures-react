import { Heading } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
const Profile = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Heading>Profile</Heading>
      Email: {`${currentUser.email}`}
    </div>
  );
};

export default Profile;
