import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";

interface ReactionsToggleProps {
  commitId: number;
}

const ReactionsToggle = ({ commitId }: ReactionsToggleProps) => {
  const [reactions, setReactions] = useState<any>({});
  const [isClicked, setIsClicked] = useState<boolean>(false);
  // const [totalReactions, setTotalReactions] = useState<number>(0); //use length to set

  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchReactions = async () => {
      let { data: fetchedReactions } = await supabase
        .from("reactions")
        .select(
          `*, reactor: profiles(username, avatar_url), status: commitments(is_up_to_date)`,
        )
        .eq("commitment_id", commitId)
        .eq("is_archived", false);
      setReactions(fetchedReactions);
    };
    fetchReactions();
  }, [commitId]);

  // const userHasClicked =
  //   reactions.filter(
  //     (reaction: any) =>
  //       reaction.user_id === currentUser.id && reaction.is_clicked === true,
  //   ).length > 0;
  // setIsClicked(userHasClicked);

  useEffect(() => {}, [currentUser.id, reactions]);

  const handleClick = async (reactionType: string) => {
    const alreadyReacted =
      reactions.filter((reaction: any) => reaction.user_id === currentUser.id)
        .length > 0;
    if (alreadyReacted) {
      const myReaction = reactions.filter(
        (reaction: any) => reaction.user_id === currentUser.id,
      )[0];
      const newClickedState = !myReaction.is_clicked;
      const { data: updatedReaction } = await supabase
        .from("reactions")
        .update({ is_clicked: newClickedState })
        .eq("user_id", currentUser.id)
        .eq("commitment_id", reactions[0].commitment_id)
        .select();
      setIsClicked(newClickedState);
    } else {
      const { data } = await supabase
        .from("reactions")
        .insert([
          {
            user_id: currentUser.id,
            commitment_id: commitId,
            type: reactionType,
            is_clicked: true,
          },
        ])
        .select();
      setIsClicked(true);
      setReactions([...reactions, data]);
    }
  };

  return (
    <>
      {reactions && reactions.status && reactions.status.is_up_to_date ? (
        <Text
          cursor="pointer"
          onClick={() => handleClick("highfive")}
          p="0px"
          m="2px"
        >
          🙌
          {reactions &&
            reactions.length &&
            reactions.filter(
              (reaction: any) =>
                reaction.type === "highfive" && reaction.is_clicked,
            ).length}
        </Text>
      ) : (
        <Text
          cursor="pointer"
          onClick={() => handleClick("nudge")}
          p="0px"
          m="2px"
        >
          👉
          {reactions &&
            reactions.length &&
            reactions.filter(
              (reaction: any) =>
                reaction.type === "nudge" && reaction.is_clicked,
            ).length}
        </Text>
      )}
    </>
  );
};
export default ReactionsToggle;
