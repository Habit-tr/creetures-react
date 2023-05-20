import { Card, Center } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
import RenderMedal from "../challenges/RenderMedal";
import ReactionsToggle from "../friends/ReactionsToggle";

interface ReactionBadgeCardProps {
  badge: any;
}

const ReactionBadgeCard = ({ badge }: ReactionBadgeCardProps) => {
  const { currentUser } = useAuth();
  return (
    <Card
      padding="10px"
      margin="10px"
      height="100px"
      width="120px"
      key={badge.id}
      justifyContent="center"
    >
      <Center mb="10px">
        <RenderMedal level={badge.badge_level} />
      </Center>
      <Center fontSize="xs">{badge.challenge.name}</Center>
      {badge.user_id !== currentUser.id && (
        <ReactionsToggle commitId={badge.id} />
      )}
    </Card>
  );
};
export default ReactionBadgeCard;
