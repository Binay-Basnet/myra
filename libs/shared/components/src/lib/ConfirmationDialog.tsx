import { MutableRefObject } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import { Button, Text } from '@myra-ui';

interface IConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: MutableRefObject<HTMLButtonElement | null>;
  handleConfirm: () => void;
  title: string;
  description: string;
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  cancelRef,
  handleConfirm,
  title,
  description,
}: IConfirmationDialogProps) => (
  <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader
          fontSize="lg"
          fontWeight="bold"
          borderBottom="1px"
          borderColor="border.layout"
        >
          <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
            {title}
          </Text>
        </AlertDialogHeader>

        <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
          <Text fontSize="s3" fontWeight={400} color="gray.800">
            {description}
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            ml={3}
            onClick={() => {
              handleConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);
