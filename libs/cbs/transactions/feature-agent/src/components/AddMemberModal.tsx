import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import {
  AssignMembersInput,
  useSetAddMemberToAgentDataMutation,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Button,
  Divider,
  FormAccountSelect,
  FormMemberSelect,
  Text,
} from '@coop/shared/ui';

import { OverrideAlertModal } from './index';

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
  const router = useRouter();

  const id = router?.query?.['id'];

  const [isOverrideMemberAlertOpen, setIsOverrideMemberAlertOpen] =
    useState<boolean>(false);

  const methods = useForm<AssignMembersInput>();

  const { watch, getValues, reset } = methods;

  const memberId = watch('memberId');

  const { mutateAsync: assignMemberToAgent } =
    useSetAddMemberToAgentDataMutation();

  const handleAssignMember = () => {
    asyncToast({
      id: 'assign-new-member-to-agent',
      promise: assignMemberToAgent({
        agentId: id as string,
        data: getValues(),
      }),
      msgs: {
        loading: 'Assigning New Member',
        success: 'Assigned New Member',
      },
      onSuccess: (response) => {
        if (response?.transaction?.addMemberToAgent?.error) {
          if (response?.transaction?.addMemberToAgent?.error?.code === 418) {
            setIsOverrideMemberAlertOpen(true);
          }
        } else {
          reset();
          refetchAssignedMembersList();
        }
        onClose();
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
        loading: 'Assigning New Member',
        success: 'Assigned New Member',
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontSize="r2"
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
            >
              Add Member
            </Text>
          </ModalHeader>
          <Divider />

          <ModalCloseButton />
          <ModalBody p="s16" maxHeight="60vh" overflowY="scroll">
            <FormProvider {...methods}>
              <Box display="flex" flexDirection="column" gap="s20" pb="200px">
                <FormMemberSelect name="memberId" label="Member" />

                <FormAccountSelect
                  name="accountId"
                  label="Account"
                  memberId={memberId}
                />
              </Box>
            </FormProvider>
          </ModalBody>

          <Divider />
          <ModalFooter>
            <Button variant="solid" onClick={handleAssignMember}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <OverrideAlertModal
        isOpen={isOverrideMemberAlertOpen}
        onCancel={handleCancelOverrideMemberAlert}
        onConfirm={handleConfirmOverrideMemberAlert}
      />
    </>
  );
};
