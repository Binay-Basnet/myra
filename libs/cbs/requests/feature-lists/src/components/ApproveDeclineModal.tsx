import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { RequestType, useApproveOrDeclineRequestMutation } from '@coop/cbs/data-access';
import { FormCheckbox, FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, ChakraModal } from '@coop/shared/ui';

interface IApproveDeclineModalProps {
  requestType: RequestType;
  queryKey: string;
  children: React.ReactNode;
  approveModal: ReturnType<typeof useDisclosure>;
}

export const ApproveDeclineModal = ({
  children,
  requestType,
  queryKey,
  approveModal,
}: IApproveDeclineModalProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      reasonForDeclination: '',
      notifyMember: false,
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
                ...methods.getValues(),
              },
              requestType,
            }),
            onSuccess: () => {
              queryClient.invalidateQueries(queryKey);
              declineIsOnToggle();
              methods.reset();
              methods.setValue('reasonForDeclination', '');
              methods.setValue('notifyMember', false);
            },
          });
        }}
        secondaryButtonHandler={() => {
          onToggle();
          declineIsOnToggle();
          methods.reset();
          methods.setValue('reasonForDeclination', '');
          methods.setValue('notifyMember', false);
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
        primaryButtonLabel="Approve"
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
              },
              requestType,
            }),
            onSuccess: () => {
              queryClient.invalidateQueries(queryKey);
              onToggle();
              methods.reset();
              methods.setValue('reasonForDeclination', '');
              methods.setValue('notifyMember', false);
            },
          });
        }}
        secondaryButtonLabel="Decline"
        secondaryButtonVariant="outline"
        secondaryButtonHandler={() => {
          onToggle();
          declineIsOnToggle();
        }}
        isSecondaryDanger
        onClose={onClose}
        title="acUpdateUser"
        open={isOpen}
        hidePadding
      >
        {children}
      </ChakraModal>
    </>
  );
};
