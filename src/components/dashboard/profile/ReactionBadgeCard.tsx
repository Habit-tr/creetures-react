import { Card, Center } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
import RenderMedal from "../challenges/RenderMedal";
import ReactionsToggle from "../friends/ReactionsToggle";

interface ReactionBadgeCardProps {
  badge: any;
}

const ReactionBadgeCard = ({ badge }: ReactionBadgeCardProps) => {
  const { currentUser } = useAuth();
  console.log(badge);
  return (
    <Card
      padding="10px"
      margin="10px"
      height="130px"
      width="130px"
      key={badge.id}
      justifyContent="center"
    >
      <Center mb="10px">
        <RenderMedal level={badge.badge_level} />
      </Center>
      <Center fontSize="xs">{badge.challenge.name.toUpperCase()}</Center>
      <Center fontSize="xs" color={badge.is_up_to_date ? `green` : `red`}>
        {badge.is_up_to_date ? `up to date` : `behind schedule`}
      </Center>
      {badge.user_id !== currentUser.id && (
        <Center>
          <ReactionsToggle commitId={badge.id} />
        </Center>
      )}
    </Card>
  );
};
export default ReactionBadgeCard;
