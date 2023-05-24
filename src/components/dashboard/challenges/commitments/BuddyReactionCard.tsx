import { Avatar, Card, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Nudge from "../../components/Nudge";
import HighFive from "../../components/Highfive";

interface BuddyReactionProps {
  commitment: {
    user_id: number;
  };
  commitment_id: number;
  created_at: string | null;
  id: number;
  is_archived: boolean;
  is_clicked: boolean;
  profile: {
    avatar_url: string;
    username: string;
  };
  type: string | null;
  user_id: string | null;
}

const BuddyReactionCard = ({ reaction }: { reaction: BuddyReactionProps }) => {
  const { profile, type, user_id } = reaction;

  return (
    <Card
      className="buddy-status-card"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgColor="green.200"
      color="black"
      w="350px"
      m="5px"
      pt="5px"
      pb="5px"
      pl="10px"
      pr="10px"
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out" 
      _hover={{ transform: "scale(1.05)", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
    >
        <Link to={`/profile/${user_id}`}>
          <Avatar
            height="40px"
            width="40px"
            bgColor="purple"
            border="1px solid black"
            src={profile.avatar_url}
          />
        </Link>
        {type === "highfive"
          ? <>
              <Text maxW="200px">{profile.username} gave you a high five!</Text>
              <HighFive />
            </>
          : <>
              <Text maxW="200px">{profile.username} nudged you.</Text>
              <Nudge />
            </>
        }
    </Card>
  );
};

export default BuddyReactionCard;
