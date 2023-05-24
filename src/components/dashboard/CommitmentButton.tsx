import { Button, Flex, Tooltip, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!isCompleted) {
      setIsLoading(true);
      await markAsComplete(commitmentId);
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="row" justifyContent="center">
      <Tooltip label="Mark as complete" isDisabled={isCompleted}>
        <Button
          colorScheme={isCompleted ? "purple" : "pink"}
          onClick={handleClick}
          isDisabled={isCompleted}
          height="100px"
          margin="10px"
          padding="8px"
          width="110px"
          whiteSpace="normal"
        >
          {isLoading ? <Spinner /> : commitmentName.toUpperCase()}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default CommitmentButton;
