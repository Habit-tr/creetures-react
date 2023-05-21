import { Box, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";

interface ReactionsToggleProps {
  commitId: number;
  status: boolean;
}

const ReactionsToggle = ({ commitId, status }: ReactionsToggleProps) => {
  const [reactions, setReactions] = useState<any>({});
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [toggled, setToggled] = useState<number>(0);
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
  }, [commitId, toggled, currentUser.id]);

  // useEffect(() => {
  //   if (reactions && reactions.length) {
  //     console.log(
  //       reactions.filter(
  //         (reaction: any) =>
  //           (reaction.commitment_id =
  //             commitId &&
  //             reaction.is_archived === false &&
  //             reaction.user_id === currentUser.id),
  //       ).length > 0,
  //     );
  //   }
  // if (fetchedReactions) {
  //   setIsClicked(
  //     fetchedReactions.filter(
  //       (reaction: any) =>
  //         reaction.user_id === currentUser.id &&
  //         reaction.is_archived === false,
  //     ).length > 0,
  //   );
  // }
  // }, [commitId, currentUser.id, reactions]);

  // const userHasClicked =
  //   reactions.filter(
  //     (reaction: any) =>
  //       reaction.user_id === currentUser.id && reaction.is_clicked === true,
  //   ).length > 0;
  // setIsClicked(userHasClicked);

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
      console.log(updatedReaction);
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
  // console.log("reactions for commitId ", commitId, ": ", reactions);
  return (
    <Box>
      {status ? (
        <Tooltip label="highfive" openDelay={500} aria-label="highfive">
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
        <Tooltip label="nudge" openDelay={500} aria-label="nudge">
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
    </Box>
  );
};
export default ReactionsToggle;
