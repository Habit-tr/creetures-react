import { Button, Flex, Tooltip } from "@chakra-ui/react";

interface CommitmentButtonProps {
  commitmentId: number;
  isCompleted: boolean;
  markAsComplete: (commitmentId: number) => void;
  commitmentName: string;
}

const CommitmentButton = ({
  commitmentId,
  isCompleted,
  markAsComplete,
  commitmentName,
}: CommitmentButtonProps) => {
  return (
    <Flex direction="row" justifyContent="center">
      <Tooltip
        label="Mark as complete"
        isDisabled={isCompleted}
      >
        <Button
          colorScheme={isCompleted ? "purple" : "pink"}
          onClick={() => !isCompleted && markAsComplete(commitmentId)}
          isDisabled={isCompleted}
          height="150px"
          width="150px"
        >
          {commitmentName.toUpperCase()}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default CommitmentButton;
