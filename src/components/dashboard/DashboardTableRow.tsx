import { Button, Flex, Td, Tooltip, Tr, Spinner } from "@chakra-ui/react";
import { Database } from "../../utils/supabaseTypes";
import CommitmentButton from "./CommitmentButton";
import React, { useEffect, useRef } from 'react';
interface DashboardTableRowProps {
  commitment: Database["public"]["Tables"]["commitments"]["Row"];
  checkedCommitments: Record<string, boolean>;
  availableRewards: Record<string, boolean>;
  handleCommitmentComplete: (commitmentId: number) => void;
  handleRedeemReward: (commitmentId: number) => Promise<void>;
}

const DashboardTableRow = ({
  commitment,
  checkedCommitments,
  handleCommitmentComplete,
  availableRewards,
  handleRedeemReward,
}: DashboardTableRowProps) => {
  const isLoadingRef = useRef<Record<number, boolean>>({});

  const setLoading = (id: number, state: boolean) => {
    isLoadingRef.current[id] = state;
  };

  const isLoading = (id: number) => !!isLoadingRef.current[id];

  useEffect(() => {
    if (isLoading(commitment.id)) {
      setLoading(commitment.id, false);
    }
  }, [checkedCommitments, availableRewards, commitment.id]);

  const handleClick = (commitmentId: number) => {
    setLoading(commitmentId, true);
    handleRedeemReward(commitmentId).then(() => setLoading(commitmentId, false));
  };



  return (
    <Tr key={commitment.id}>
      <Td>
        <Flex justifyContent="center">
          <CommitmentButton
            commitmentId={commitment.id}
            isCompleted={checkedCommitments[commitment.id] || false}
            markAsComplete={handleCommitmentComplete}
            commitmentName={commitment.challenge.name}
          />
        </Flex>
      </Td>
      {commitment.reward_id && (
        <Td>
          <Flex justifyContent="center" alignItems="center">
            <Tooltip
              label="Redeem reward"
              isDisabled={
                !checkedCommitments[commitment.id] ||
                !availableRewards[commitment.id]
              }
            >
              <Button
                isDisabled={
                  !checkedCommitments[commitment.id] ||
                  !availableRewards[commitment.id]
                }
                onClick={() => handleClick(commitment.id)}
                colorScheme={
                  !checkedCommitments[commitment.id] ||
                  !availableRewards[commitment.id]
                    ? "gray"
                    : "yellow"
                }
                height="100px"
                margin="10px"
                padding="8px"
                width="100px"
                whiteSpace="normal"
              >
                {isLoading(commitment.id) ? <Spinner /> : commitment.reward.name.toUpperCase()}
              </Button>
            </Tooltip>
            {/* <IconButton
          aria-label="Redeem"
          icon={<MdRedeem />}
          colorScheme="blue"
          isDisabled={
            !checkedCommitments[commitment.id] ||
            redeemedRewards[commitment.id]
          }
          onClick={() => handleRedeemReward(commitment.id)}
        /> */}
          </Flex>
        </Td>
      )}
    </Tr>
  );
};
export default DashboardTableRow;