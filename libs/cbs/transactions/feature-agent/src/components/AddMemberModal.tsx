import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Modal } from '@myra-ui';

import {
  AssignMembersInput,
  ObjState,
  useSetAddMemberToAgentDataMutation,
} from '@coop/cbs/data-access';
import { FormAccountSelect, FormMemberSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { OverrideAlertModal } from './OverrideAlertModal';

interface IAddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchAssignedMembersList: () => void;
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

  const { watch, getValues, reset } = methods;

  const memberId = watch('memberId');

  const { mutateAsync: assignMemberToAgent } = useSetAddMemberToAgentDataMutation();

  const handleAssignMember = () => {
    asyncToast({
      id: 'assign-new-member-to-agent',
      promise: assignMemberToAgent({
        agentId: id as string,
        data: getValues(),
      }),
      msgs: {
        loading: t['agentAssignedMembersAssigningNewMember'],
        success: t['agentAssignedMembersAssignedNewMember'],
      },
      onSuccess: () => {
        reset();
        refetchAssignedMembersList();
        onClose();
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
    asyncToast({
      id: 'assign-new-member-to-agent',
      promise: assignMemberToAgent({
        agentId: id as string,
        data: getValues(),
        override: true,
      }),
      msgs: {
        loading: t['agentAssignedMembersAssigningNewMember'],
        success: t['agentAssignedMembersAssignedNewMember'],
      },
      onSuccess: () => {
        setIsOverrideMemberAlertOpen(false);
        reset();
        refetchAssignedMembersList();
      },
    });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        title={t['agentAssignedMembersAddMember']}
        primaryButtonLabel="Save"
        primaryButtonHandler={handleAssignMember}
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s20" pb="200px">
            <FormMemberSelect name="memberId" label={t['agentAssignedMembersMember']} />

            <FormAccountSelect
              name="accountId"
              label={t['agentAssignedMembersAccount']}
              memberId={memberId}
              filterBy={ObjState.Active}
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
