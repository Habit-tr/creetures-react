import { Card, Center, Box } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
import RenderMedal from "../challenges/RenderMedal";
import ReactionsToggle from "../friends/ReactionsToggle";

import UpToDate from "../components/UpToDate";
import Behind from "../components/Behind";

interface ReactionBadgeCardProps {
  badge: any;
}

const ReactionBadgeCard = ({ badge }: ReactionBadgeCardProps) => {
  const { currentUser } = useAuth();
  return (
    <Card
      // padding="10px"
      // margin="10px"
      height="250px"
      width="210px"
      key={badge.id}
      justifyContent="center"
      alignItems="center"
    >
      <Center mb="10px">
        <RenderMedal level={badge.badge_level} />
      </Center>
      <Center textAlign="center" fontSize="sm" >
        {badge.challenge.name.toUpperCase()}
      </Center>
      <Box display='flex'>
      <Center p='10px' fontSize="sm" color={badge.is_up_to_date ? `green` : `red`} >
        {/* {badge.is_up_to_date ? <UpToDate/> : <Behind/>} */}
        {badge.is_up_to_date ? `Up-to-date` :`Behind`}
      </Center>
      {badge.user_id !== currentUser.id && (
        <Center pl='0px'>
          <ReactionsToggle commitId={badge.id} status={badge.is_up_to_date} />
        </Center>
      )}
      </Box>
    </Card>
  );
};
export default ReactionBadgeCard;
