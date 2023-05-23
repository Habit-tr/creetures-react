import { Button, Flex, Td, Tooltip, Tr } from "@chakra-ui/react";
import { Database } from "../../utils/supabaseTypes";
import CommitmentButton from "./CommitmentButton";
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
                onClick={() => handleRedeemReward(commitment.id)}
                colorScheme={
                  !checkedCommitments[commitment.id] ||
                  !availableRewards[commitment.id]
                    ? "gray"
                    : "yellow"
                }
                height="100px"
                margin="10px"
                padding="10px"
                width="150px"
              >
                {commitment.reward.name.toUpperCase()}
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
