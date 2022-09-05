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
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useSetAddMemberToAgentDataMutation,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Button,
  DEFAULT_PAGE_SIZE,
  Divider,
  FormAccountSelect,
  FormMemberSelect,
  Text,
} from '@coop/shared/ui';

interface IAddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchAssignedMembersList: () => void;
}

const accountTypes = {
  [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
};

export const AddMemberModal = ({
  isOpen,
  onClose,
  refetchAssignedMembersList,
}: IAddMemberModalProps) => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm<AssignMembersInput>();

  const { watch, getValues, reset } = methods;

  const memberId = watch('memberId');

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

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
      onSuccess: () => {
        reset();
        refetchAssignedMembersList();
        onClose();
      },
    });
  };

  return (
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
                options={accountListData?.account?.list?.edges?.map(
                  (account) => ({
                    accountInfo: {
                      accountName: account.node?.product.productName,
                      accountId: account.node?.id,
                      accountType: account?.node?.product?.nature
                        ? accountTypes[account?.node?.product?.nature]
                        : '',
                      balance: account?.node?.balance ?? '0',
                      fine:
                        account?.node?.product?.nature ===
                          NatureOfDepositProduct.RecurringSaving ||
                        account?.node?.product?.nature ===
                          NatureOfDepositProduct.Mandatory
                          ? (account?.node?.fine as string)
                          : '',
                    },
                    value: account.node?.id as string,
                  })
                )}
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
  );
};
