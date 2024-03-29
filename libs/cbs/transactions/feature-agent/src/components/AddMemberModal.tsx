import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Modal } from '@myra-ui';

import { useAddAgentMemberMutation } from '@coop/cbs/data-access';
import { FormMemberSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { OverrideAlertModal } from './OverrideAlertModal';

interface IAddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchAssignedMembersList: () => void;
}

interface AssignMembersInput {
  memberId: string;
  accountId: { label: string; value: string }[];
}

export const AddMemberModal = ({
  isOpen,
  onClose,
  refetchAssignedMembersList,
}: IAddMemberModalProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const [isOverrideMemberAlertOpen, setIsOverrideMemberAlertOpen] = useState<boolean>(false);

  const methods = useForm<AssignMembersInput>();

  const { getValues, reset } = methods;

  const { mutateAsync: assignMemberToAgent } = useAddAgentMemberMutation();

  const handleAssignMember = () => {
    const values = getValues();

    asyncToast({
      id: 'assign-new-member-to-agent',
      promise: assignMemberToAgent({
        id: id as string,
        memberId: values?.memberId,
      }),
      msgs: {
        loading: t['agentAssignedMembersAssigningNewMember'],
        success: t['agentAssignedMembersAssignedNewMember'],
      },
      onSuccess: () => {
        refetchAssignedMembersList();
        handleClose();
      },
      onError: (error) => {
        if (error?.code === 418) {
          setIsOverrideMemberAlertOpen(true);
          onClose();
        }
      },
    });
  };

  const handleCancelOverrideMemberAlert = () => {
    setIsOverrideMemberAlertOpen(false);
  };

  const handleConfirmOverrideMemberAlert = () => {
    const values = getValues();

    asyncToast({
      id: 'assign-new-member-to-agent-override',
      promise: assignMemberToAgent({
        id: id as string,
        memberId: values?.memberId,
        override: true,
      }),
      msgs: {
        loading: t['agentAssignedMembersAssigningNewMember'],
        success: t['agentAssignedMembersAssignedNewMember'],
      },
      onSuccess: () => {
        setIsOverrideMemberAlertOpen(false);
        handleClose();
        refetchAssignedMembersList();
      },
    });
  };

  const handleClose = () => {
    reset({ memberId: '' });
    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        title={t['agentAssignedMembersAddMember']}
        primaryButtonLabel="Add"
        primaryButtonHandler={handleAssignMember}
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s20" pb="200px">
            <FormMemberSelect
              name="memberId"
              label={t['agentAssignedMembersMember']}
              isCurrentBranchMember
              menuPosition="fixed"
            />
          </Box>
        </FormProvider>
      </Modal>
      <OverrideAlertModal
        isOpen={isOverrideMemberAlertOpen}
        onCancel={handleCancelOverrideMemberAlert}
        onConfirm={handleConfirmOverrideMemberAlert}
      />
    </>
  );
};
