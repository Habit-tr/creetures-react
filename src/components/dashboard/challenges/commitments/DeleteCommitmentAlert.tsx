import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface DeleteAlertProps  {
  onDelete: () => Promise<void> | void;
};

const DeleteCommitmentAlert = ({ onDelete }: DeleteAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    await onDelete();
    onClose();
  };

  return (
    <>
      <Button
        ml={3}
        bgColor="red.300"
        onClick={onOpen}
      >
        <DeleteIcon />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              bgColor="red.300"
            >
              Delete Commitment
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                Deleting this commitment will remove all progress and reactions you've acquired and reset your badge level to level 1.
              </Text>
              <br />
              <Text fontStyle="italic">
                Are you sure you want to delete this commitment?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button bgColor="red.300" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCommitmentAlert;
