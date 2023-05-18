import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "../../../utils/supabaseClient";
const CycleTest = () => {
  // UPDATE COMMITMENTS
  //fetch relevantCommitments (filter parameters)
  //const updatedCommitments = relevantCommitments.map(commitment) => if isClicked, isUpToDate = true and isClicked = false else isUpToDate = false and isClicked = false
  //updateAll(updatedCommitments)

  const [commitments, setCommitments] = useState<any>([]);
  const { day } = useParams();
  useEffect(() => {
    const updateCommitments = async () => {
      const { data: fetchedCommitments } = await supabase
        .from("commitments")
        .select(`*`);
      // .filter("frequency", "cs", day); // Use `cs` for `contains()`, `{}` for array values
      // .match({ id: id })
      console.log(fetchedCommitments);
      return fetchedCommitments;
    };
    setCommitments(updateCommitments());
  }, [day]);

  // UPDATE DASHBOARD
  // ??? update global start time for dashboard? or can we handle that on front end ???

  // UPDATE REACTIONS
  //fetch allCurrentReactionsFromCommitments (filter parameters)
  //const allUpdatedReactions = allCurrentReactionsFromCommitments.map((reaction) => isArchived = true)
  //updateAll(allUpdatedReactions)

  return (
    <>
      <Heading>Cycle Test</Heading>
      <Button>Fetch Commitments</Button>
      <Button>Cycle Commitments</Button>
      <Button>Mark Commitments As Done</Button>
    </>
  );
};
export default CycleTest;