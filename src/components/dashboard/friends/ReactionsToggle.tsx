import { Box, Center, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";

interface ReactionsToggleProps {
  commitId: number;
  status: boolean;
}

const ReactionsToggle = ({ commitId, status }: ReactionsToggleProps) => {
  const [reactions, setReactions] = useState<any>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [toggled, setToggled] = useState<number>(0);

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
      let { data: myClickedReactions } = await supabase
        .from("reactions")
        .select(`*`)
        .eq("commitment_id", commitId)
        .eq("user_id", currentUser.id)
        .eq("is_archived", false)
        .eq("is_clicked", true);
      setIsClicked(myClickedReactions ? myClickedReactions.length > 0 : false);
    };
    fetchReactions();
  }, [commitId, toggled, currentUser.id]);

  const handleClick = async (reactionType: string) => {
    const alreadyReacted =
      reactions.filter(
        (reaction: any) =>
          reaction.user_id === currentUser.id && reaction.is_archived === false,
      ).length > 0;
    if (alreadyReacted) {
      const myReaction = reactions.filter(
        (reaction: any) => reaction.user_id === currentUser.id,
      )[0];
      const newClickedState = !myReaction.is_clicked; //this toggles the new clicked status to the opposite of its current status
      //update existing not-archived reaction
      const { data: updatedReaction } = await supabase
        .from("reactions")
        .update({ is_clicked: newClickedState })
        .eq("user_id", currentUser.id)
        .eq("commitment_id", commitId)
        .eq("is_archived", false)
        .select();
      // console.log(updatedReaction);
      setToggled(toggled + 1); //this refreshes the page
      setIsClicked(newClickedState);
    } else {
      //there isn't an existing reaction, so create a new one
      const { data } = await supabase
        .from("reactions")
        .insert([
          {
            user_id: currentUser.id,
            commitment_id: commitId,
            type: reactionType,
            is_clicked: true,
            is_archived: false,
          },
        ])
        .select();
      setToggled(toggled + 1);
      setIsClicked(true);
      setReactions([...reactions, data]); //push the new reaction into the reactions array
    }
  };

  const renderTooltipList = (reactions: any, type: string) => {
    const reactors = reactions
      .filter(
        (reaction: any) =>
          reaction.type === type &&
          reaction.is_archived === false &&
          reaction.is_clicked === true,
      )
      .map((reaction: any) => reaction.reactor.username);
    return reactors.join(", ");
  };

  // console.log("reactions for commitId ", commitId, ": ", reactions);
  return (
    <Box width="60px">
      <Center bgColor="white">
        {status ? (
          <Tooltip
            label={renderTooltipList(reactions, "highfive")}
            openDelay={500}
            aria-label="highfive"
          >
            <Text
              cursor="pointer"
              bgColor="white"
              onClick={() => handleClick("highfive")}
              p="4px"
            >
              {isClicked ? `🙌🏾` : `🙌🏻`}{" "}
              {reactions &&
                reactions.length &&
                reactions.filter(
                  (reaction: any) =>
                    reaction.type === "highfive" && reaction.is_clicked,
                ).length}
            </Text>
          </Tooltip>
        ) : (
          <Tooltip
            label={renderTooltipList(reactions, "nudge")}
            openDelay={500}
            aria-label="nudge"
          >
            <Text
              cursor="pointer"
              onClick={() => handleClick("nudge")}
              bgColor="white"
              p="4px"
            >
              {isClicked ? `👈🏾` : `👈🏻`}{" "}
              {reactions &&
                reactions.length &&
                reactions.filter(
                  (reaction: any) =>
                    reaction.type === "nudge" && reaction.is_clicked,
                ).length}
            </Text>
          </Tooltip>
        )}
      </Center>
    </Box>
  );
};
export default ReactionsToggle;
