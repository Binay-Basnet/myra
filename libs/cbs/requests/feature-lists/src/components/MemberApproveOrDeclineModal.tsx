import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';

import { useApproveOrDeclineMemberRequestMutation } from '@coop/cbs/data-access';
import { FormCheckbox, FormTextArea } from '@coop/shared/form';

interface IApproveDeclineModalProps {
  children: React.ReactNode;
  approveModal: ReturnType<typeof useDisclosure>;
}

export const MemberApproveOrDeclineModal = ({
  children,
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

  const { mutateAsync: approveOrDecline } = useApproveOrDeclineMemberRequestMutation();

  const {
    isOpen: declineIsOpen,
    onClose: declineIsOnClose,
    onToggle: declineIsOnToggle,
  } = useDisclosure();

  const status = router.query['status'] === 'true';

  return (
    <>
      <Modal
        open={declineIsOpen}
        onClose={declineIsOnClose}
        primaryButtonHandler={methods.handleSubmit(async () => {
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
            }),
            onSuccess: () => {
              queryClient.invalidateQueries(['getMemberRequestList']);
              declineIsOnToggle();
              methods.reset();
              methods.setValue('reasonForDeclination', '');
              methods.setValue('notifyMember', false);
            },
          });
        })}
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
            <FormTextArea
              rules={{ required: { value: true, message: 'This field is required' } }}
              h="100px"
              name="reasonForDeclination"
              label="Reason for Declination"
            />
            <FormCheckbox name="notifyMember" label="Notify Member" />
          </Box>
        </FormProvider>
      </Modal>

      <Modal
        width="2xl"
        primaryButtonLabel={status ? 'Approve & Add' : undefined}
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
            }),
            onSuccess: () => {
              queryClient.invalidateQueries(['getMemberRequestList']);
              onToggle();
              methods.reset();
              methods.setValue('reasonForDeclination', '');
              methods.setValue('notifyMember', false);
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
        title="Member Request"
        open={isOpen}
        hidePadding
      >
        {children}
      </Modal>
    </>
  );
};
