import { Button, Heading } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
const Account = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Heading>Account Details</Heading>
      Email: {`${currentUser.email}`}
      <Button>Log Out</Button>
    </div>
  );
};

export default Account;
