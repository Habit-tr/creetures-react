import { Button } from "@chakra-ui/react";

interface CommitmentButtonProps {
  commitmentId: number;
  isCompleted: boolean;
  markAsComplete: (commitmentId: number) => void;
}

const CommitmentButton = ({ commitmentId, isCompleted, markAsComplete }: CommitmentButtonProps) => {
  return (
    <Button
      colorScheme={isCompleted ? "green" : "gray"}
      onClick={() => !isCompleted && markAsComplete(commitmentId)}
      isDisabled={isCompleted}
    >
      {isCompleted ? "Completed" : "Mark as Complete"}
    </Button>
  );
};

export default CommitmentButton;
