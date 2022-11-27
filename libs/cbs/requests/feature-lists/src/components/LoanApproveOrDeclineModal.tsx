import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { RequestType, useApproveOrDeclineRequestMutation } from '@coop/cbs/data-access';
import { FormCheckbox, FormDatePicker, FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, ChakraModal } from '@myra-ui';

interface IApproveDeclineModalProps {
  queryKey: string;
  children: React.ReactNode;
  approveModal: ReturnType<typeof useDisclosure>;
}

export const LoanApproveOrDeclineModal = ({
  children,
  queryKey,
  approveModal,
}: IApproveDeclineModalProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const status = router.query['status'] === 'true';

  const methods = useForm({
    defaultValues: {
      reasonForDeclination: '',
      notifyMember: false,
      purposedDate: '',
    },
  });

  const { isOpen, onClose, onToggle } = approveModal;

  const { mutateAsync: approveOrDecline } = useApproveOrDeclineRequestMutation();

  const {
    isOpen: declineIsOpen,
    onClose: declineIsOnClose,
    onToggle: declineIsOnToggle,
  } = useDisclosure();

  return (
    <>
      <ChakraModal
        open={declineIsOpen}
        onClose={declineIsOnClose}
        primaryButtonHandler={async () => {
          await asyncToast({
            id: 'decline-request',
            msgs: {
              loading: 'Declining Request',
              success: 'Request Declined !',
            },
            promise: approveOrDecline({
              data: {
                requestId: router.query['id'] as string,
                approve: false,
                reasonForDeclination: methods.getValues().reasonForDeclination,
                notifyMember: methods.getValues().notifyMember,
              },
              requestType: RequestType.LoanRequest,
            }),
            onSuccess: () => {
              queryClient.invalidateQueries([queryKey]);
              declineIsOnToggle();
              methods.reset();
              methods.setValue('reasonForDeclination', '');
              methods.setValue('notifyMember', false);
              methods.setValue('purposedDate', '');
            },
          });
        }}
        secondaryButtonHandler={() => {
          onToggle();
          declineIsOnToggle();
          methods.reset();
          methods.setValue('reasonForDeclination', '');
          methods.setValue('notifyMember', false);
          methods.setValue('purposedDate', '');
        }}
        primaryButtonLabel="Done"
        secondaryButtonLabel="Undo"
        title="Do you sure want to Decline ?"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormTextArea h="100px" name="reasonForDeclination" label="Reason for Declination" />
            <FormCheckbox name="notifyMember" label="Notify Member" />
          </Box>
        </FormProvider>
      </ChakraModal>

      <ChakraModal
        width="2xl"
        primaryButtonLabel={status ? 'Schedule' : undefined}
        primaryButtonHandler={async () => {
          await asyncToast({
            id: 'approve-request',
            msgs: {
              loading: 'Approving Request',
              success: 'Request Approved !',
            },
            promise: approveOrDecline({
              data: {
                requestId: router.query['id'] as string,
                approve: true,
                purposedDate: methods.getValues().purposedDate,
              },
              requestType: RequestType.LoanRequest,
            }),
            onSuccess: () => {
              queryClient.invalidateQueries([queryKey]);
              methods.reset();
              methods.setValue('reasonForDeclination', '');
              methods.setValue('notifyMember', false);
              methods.setValue('purposedDate', '');
              onToggle();
            },
          });
        }}
        secondaryButtonLabel={status ? 'Decline' : undefined}
        secondaryButtonVariant="outline"
        secondaryButtonHandler={() => {
          onToggle();
          declineIsOnToggle();
        }}
        isSecondaryDanger
        onClose={onClose}
        title="Loan Request"
        open={isOpen}
        hidePadding
      >
        {children}

        <FormProvider {...methods}>
          <Box p="s16">
            <FormDatePicker label="Purposed Meeting Date" name="purposedDate" />
          </Box>
        </FormProvider>
      </ChakraModal>
    </>
  );
};
