import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface PauseAlertProps {
  onPause: () => Promise<void> | void;
}

const PauseAlert = ({ onPause }: PauseAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const togglePause = async () => {
    await onPause();
    onClose();
  };

  return (
    <>
      <Button ml={3} colorScheme="pink" onClick={onOpen}>
        Pause
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" bgColor="salmon">
              Pause Commitment
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                Pausing this commitment will hault your progress in this
                challenge. You will retain all your current progress, reactions,
                and badge level, and at any point you can pick up where you left
                off by recommitting to this challenge.
              </Text>
              <br />
              <Text fontStyle="italic">
                Are you sure you want to pause this commitment?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="pink" onClick={togglePause} ml={3}>
                Pause
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default PauseAlert;
