import { MutableRefObject } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Button, Text } from '@myra-ui';

import { useAccountDetails, useDisableTransactionRestrictMutation } from '@coop/cbs/data-access';

interface IUnlockTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: MutableRefObject<HTMLButtonElement | null>;
}

export const UnlockTransactionModal = ({
  isOpen,
  onClose,
  cancelRef,
}: IUnlockTransactionModalProps) => {
  const queryClient = useQueryClient();

  const { accountDetails } = useAccountDetails();

  const { mutateAsync } = useDisableTransactionRestrictMutation();

  const handleConfirm = () => {
    asyncToast({
      id: 'unlock-account-transaction',
      msgs: {
        success: 'Transactions unlocked successfully',
        loading: 'Unlocking transactions',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        onClose();
      },
      promise: mutateAsync({
        id: accountDetails?.transactionConstraints?.blockId as string,
      }),
    });
  };

  return (
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
              Unlock Account Transactions
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
            <Text fontSize="s3" fontWeight={400} color="gray.800">
              Are you sure you want to unlock transactions for this account?
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
              }}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
