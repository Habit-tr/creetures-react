import { Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../utils/reduxHooks";
import { fetchAllEarnedRewardsAsync, selectEarnedRewards } from "./allEarnedRewardsSlice";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Database } from "../../../utils/supabaseTypes";

const RedeemedRewards = () => {
  const dispatch = useAppDispatch();
  const fetchedRewards = useAppSelector(selectEarnedRewards);
  const { currentUser } = useAuth();
  const [redeemedRewards, setRedeemedRewards] = useState<Database['public']['Tables']['earned_rewards']['Row'][]>([])

  useEffect(() => {
    dispatch(fetchAllEarnedRewardsAsync(currentUser.id));
  }, [dispatch, currentUser.id]);

  useEffect(() => {
    const redeemed = fetchedRewards.filter((reward) => reward.is_redeemed);
    setRedeemedRewards(redeemed);
  }, [fetchedRewards]);

  return (
    <>
      <Heading>My Redeemed Rewards</Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Reward Name</Th>
            <Th>Details</Th>
            <Th>Date Redeemed</Th>
          </Tr>
        </Thead>
        <Tbody>
          {redeemedRewards && redeemedRewards.length ? (
            redeemedRewards.map((reward) => (
              <Tr key={reward.id}>
                <Td>{reward.reward?.name}</Td>
                <Td>{reward.reward?.description}</Td>
                <Td>{reward.date_redeemed}</Td>
              </Tr>
            ))
          ) : null}
        </Tbody>
      </Table>
    </>
  )
}

export default RedeemedRewards