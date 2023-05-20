import { Button } from "@chakra-ui/react";
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
        .select(`*, reactor: profiles(username, avatar_url)`)
        .eq("commitment_id", commitId)
        .eq("is_archived", false);
      setReactions(fetchedReactions);
    };
    fetchReactions();
  }, [commitId]);

  return (
    <>
      <Button p="0px">🙌 0</Button>
      <Button p="0px">👉 3</Button>
      <pre>{JSON.stringify(reactions)}</pre>
    </>
  );
};
export default ReactionsToggle;
