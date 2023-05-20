import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabaseClient";

interface ReactionsToggleProps {
  commitId: number;
}

const ReactionsToggle = ({ commitId }: ReactionsToggleProps) => {
  const [reactions, setReactions] = useState<any>({});
  useEffect(() => {
    console.log("fetch reactions");
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

  return (
    <>
      {reactions && reactions.status && reactions.status.is_up_to_date ? (
        <Text p="0px" m="2px">
          🙌{" "}
          {reactions &&
            reactions.length &&
            reactions.filter(
              (reaction: any) =>
                reaction.type === "highfive" && reaction.is_clicked,
            ).length}
        </Text>
      ) : (
        <Text p="0px" m="2px">
          👉
          {reactions &&
            reactions.length &&
            reactions.filter(
              (reaction: any) =>
                reaction.type === "nudge" && reaction.is_clicked,
            ).length}
        </Text>
      )}
      <pre>{JSON.stringify(reactions, null, 2)}</pre>
    </>
  );
};
export default ReactionsToggle;
