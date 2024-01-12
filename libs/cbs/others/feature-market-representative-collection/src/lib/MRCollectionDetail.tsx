import { useMemo } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { IoAdd, IoCloseCircleOutline } from 'react-icons/io5';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { HStack, useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Icon, Loader, Modal, Text } from '@myra-ui';

import {
  NatureOfDepositProduct,
  ObjState,
  TodayListStatus,
  useAddAgentTodayListMutation,
  useAgentTodayTaskDetailQuery,
  useAppSelector,
  useEditRejectedTodayListMutation,
  useGetAccountTableListQuery,
  useListAgentMemberQuery,
  useSendTodayTaskMutation,
} from '@coop/cbs/data-access';
import { getAmountToCollect } from '@coop/cbs/transactions/agent';
import { ConfirmationDialog } from '@coop/shared/components';
import { FormLayout, FormNumberInput, FormSelect } from '@coop/shared/form';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

type AccountsEntry = {
  id?: string;
  memberId: string;
  memberName: string;
  memberCode: string;
  accountId: string;
  accountName: string;
  amountToBeCollected: string;
  fineToBeCollected: string;
  amountCollected: string;
  fineCollected: string;
  installmentAmount: string;
  dueInstallments: number;
};

type TodaysList = {
  accounts: AccountsEntry[];
};

export const MRCollectionDetail = () => {
  const user = useAppSelector((state) => state?.auth?.user);

  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm<TodaysList>();

  const { getValues, setValue, watch, control, reset, formState } = methods;

  const agentId = user?.id;

  const {
    isOpen: isAddAccountsModalOpen,
    onClose: onAddAccountsModalClose,
    onToggle: onAddAccountsModalToggle,
  } = useDisclosure();

  const {
    isOpen: isConfirmModalOpen,
    onClose: onConfirmModalClose,
    onToggle: onConfirmModalToggle,
  } = useDisclosure();

  const { data: agentTaskDetailData, isFetching } = useAgentTodayTaskDetailQuery({
    id: id as string,
  });

  const { submissionStatus, rejectReason } = useMemo(
    () => ({
      submissionStatus: agentTaskDetailData?.agent?.agentTodayTaskDetail?.status as TodayListStatus,
      rejectReason: agentTaskDetailData?.agent?.agentTodayTaskDetail?.remark,
    }),
    [agentTaskDetailData]
  );

  useDeepCompareEffect(() => {
    if (agentTaskDetailData) {
      const taskList = agentTaskDetailData?.agent?.agentTodayTaskDetail?.record ?? [];

      reset({
        accounts: taskList?.map((record) => ({
          id: record?.id,
          memberId: record?.member?.id,
          memberName: record?.member?.name?.en,
          memberCode: record?.member?.code,
          accountId: record?.account?.id,
          accountName: record?.account?.accountName,
          amountToBeCollected: record?.amountToBeCollected,
          fineToBeCollected: record?.fineToBeCollected,
          amountCollected: record?.amount,
          fineCollected: record?.fine,
          dueInstallments: record?.account?.dues?.dueInstallments,
          installmentAmount: record?.account?.installmentAmount,
        })) as AccountsEntry[],
      });
    }
  }, [agentTaskDetailData]);

  const accounts = watch('accounts');

  const { mutateAsync: addAgentTodayList } = useAddAgentTodayListMutation();

  const { mutateAsync: editRejectedTodayList } = useEditRejectedTodayListMutation();

  const handleSaveTodayList = () => {
    const values = getValues();

    if (submissionStatus === 'FAILED') {
      asyncToast({
        id: 'edit-agent-today-list',
        promise: editRejectedTodayList({
          input: {
            agentId: agentId as string,
            submissionId: id as string,
            data: values?.accounts?.map((a) =>
              a?.id
                ? {
                    id: a.id,
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
                : {
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
            ),
          },
        }),
        msgs: {
          loading: 'Updating today list',
          success: 'Today list updated',
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['getAgentTodayListData']);
          router.back();
        },
      });
    } else {
      asyncToast({
        id: 'set-agent-today-list',
        promise: addAgentTodayList({
          input: {
            agentId: agentId as string,
            submissionId: id as string,
            data: values?.accounts?.map((a) =>
              a?.id
                ? {
                    id: a.id,
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
                : {
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
            ),
          },
        }),
        msgs: {
          loading: 'Updating today list',
          success: 'Today list updated',
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['getAgentTodayListData']);
          router.back();
        },
      });
    }
  };
  const { fields, remove } = useFieldArray({ name: 'accounts', control });

  const handleAddAccounts = (
    accArr: {
      memberId: string;
      memberName: string;
      memberCode: string;
      accountId: string;
      accountName: string;
      amountToBeCollected: string;
      fineToBeCollected: string;
      installmentAmount: string;
      dueInstallments: number;
    }[]
  ) => {
    const values = getValues();

    const formAccounts = values?.accounts?.map((v) => v?.accountId);

    const accountsToAdd = accArr?.filter((acc) => !formAccounts?.includes(acc?.accountId)) ?? [];

    if (accountsToAdd?.length) {
      setValue('accounts', [
        ...(values?.accounts ?? []),
        ...(accountsToAdd?.map((toAdd) => ({ ...toAdd })) ?? []),
      ] as AccountsEntry[]);
    }
  };

  const { mutateAsync: sendTodayTask } = useSendTodayTaskMutation();

  const handleSubmitCollectionRequest = () => {
    asyncToast({
      id: 'submit-mr-collection-request',
      promise: sendTodayTask({
        id: id as string,
      }),
      msgs: {
        loading: 'Submitting collection request',
        success: 'Collection request submitted',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['listMRSubmissionList']);
        router.back();
      },
    });
  };

  const totalAmount = accounts?.reduce((sum, acc) => sum + Number(acc?.amountCollected || 0), 0);
  const totalFine = accounts?.reduce((sum, acc) => sum + Number(acc?.fineCollected || 0), 0);

  const handleSaveAndSubmit = () => {
    const values = getValues();

    if (submissionStatus === 'FAILED') {
      asyncToast({
        id: 'edit-agent-today-list',
        promise: editRejectedTodayList({
          input: {
            agentId: agentId as string,
            submissionId: id as string,
            data: values?.accounts?.map((a) =>
              a?.id
                ? {
                    id: a.id,
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
                : {
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
            ),
          },
        }),
        msgs: {
          loading: 'Updating today list',
          success: 'Today list updated',
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['getAgentTodayListData']);
          router.back();
        },
      });
    } else {
      asyncToast({
        id: 'set-agent-today-list',
        promise: addAgentTodayList({
          input: {
            agentId: agentId as string,
            submissionId: id as string,
            data: values?.accounts?.map((a) =>
              a?.id
                ? {
                    id: a.id,
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
                : {
                    member: a?.memberId,
                    account: a?.accountId,
                    amount: a?.amountCollected,
                    fine: a?.fineCollected,
                  }
            ),
          },
        }),
        msgs: {
          loading: 'Updating today list',
          success: 'Today list updated',
        },
        onSuccess: () => {
          asyncToast({
            id: 'submit-mr-collection-request',
            promise: sendTodayTask({
              id: id as string,
            }),
            msgs: {
              loading: 'Submitting collection request',
              success: 'Collection request submitted',
            },
            onSuccess: () => {
              queryClient.invalidateQueries(['listMRSubmissionList']);
              queryClient.invalidateQueries(['getAgentTodayListData']);
              router.back();
            },
          });
        },
      });
    }
  };

  return (
    <>
      <FormLayout methods={methods} hasSidebar>
        <FormLayout.Header
          title="New Market Representative Collection"
          buttonHandler={() => router.back()}
        />

        {isFetching && <Loader />}

        {!isFetching && (
          <>
            <FormLayout.Content>
              <FormLayout.Form>
                <Box
                  p="s16"
                  pb="100px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s32"
                >
                  <Box display="flex" flexDirection="column">
                    <Box
                      display="flex"
                      w="100%"
                      borderTopRadius="br2"
                      h="40px"
                      alignItems="center"
                      bg="gray.700"
                      color="white"
                    >
                      <Text flexBasis="35%" fontWeight="600" fontSize="r1" px="s8">
                        Member
                      </Text>

                      <Text flexBasis="35%" fontWeight="600" fontSize="r1" px="s8">
                        Account
                      </Text>

                      <Text flexBasis="15%" fontWeight="600" fontSize="r1" px="s8">
                        Amount to be Collected
                      </Text>
                      <Text flexBasis="15%" fontWeight="600" fontSize="r1" px="s8">
                        Fine to be Collected
                      </Text>
                      <Text flexBasis="15%" fontWeight="600" fontSize="r1" px="s8">
                        Amount
                      </Text>
                      <Text flexBasis="15%" fontWeight="600" fontSize="r1" px="s8">
                        Fine
                      </Text>

                      <Box w="s36" />
                    </Box>

                    <Box w="100%" bg="white" borderX="1px" borderColor="border.layout">
                      {fields.map((item, index) => (
                        <HStack
                          w="100%"
                          minH="36px"
                          alignItems="stretch"
                          bg="white"
                          spacing={0}
                          borderBottom="1px"
                          borderBottomColor="border.layout"
                          key={item?.id}
                        >
                          <Box flexBasis="40%" px="s8" display="flex" alignItems="center">
                            <Text>{`${item?.memberName} [${item?.memberCode}]`}</Text>
                          </Box>

                          <Box
                            flexBasis="40%"
                            borderLeft="1px"
                            borderLeftColor="border.layout"
                            px="s8"
                            display="flex"
                            flexDirection="column"
                          >
                            <Text>{`${item?.accountName} [${item?.accountId}]`}</Text>
                            <Text>
                              {getAmountToCollect(
                                Number(item?.amountToBeCollected),
                                Number(item?.fineToBeCollected),
                                Number(item?.installmentAmount)
                              )}
                            </Text>
                          </Box>

                          <Box
                            flexBasis="15%"
                            borderLeft="1px"
                            borderLeftColor="border.layout"
                            px="s8"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Text>{amountConverter(item?.amountToBeCollected)}</Text>
                          </Box>

                          <Box
                            flexBasis="15%"
                            borderLeft="1px"
                            borderLeftColor="border.layout"
                            px="s8"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Text>{amountConverter(item?.fineToBeCollected)}</Text>
                          </Box>

                          <Box
                            flexBasis="15%"
                            borderLeft="1px"
                            borderLeftColor="border.layout"
                            display="flex"
                            alignItems="center"
                          >
                            <FormNumberInput
                              name={`${'accounts'}.${index}.amountCollected`}
                              py="0"
                              h="100%"
                              w="100%"
                              px="s8"
                              minH="inherit"
                              _focus={{ boxShadow: 'none', bg: 'primary.100' }}
                              _focusWithin={{ boxShadow: 'none' }}
                              border="none"
                              onWheel={(e) => e.currentTarget.blur()}
                              borderRadius="0"
                              isDisabled={
                                submissionStatus === 'PENDING' || submissionStatus === 'COMPLETED'
                              }
                            />
                          </Box>

                          <Box
                            flexBasis="15%"
                            borderLeft="1px"
                            borderLeftColor="border.layout"
                            display="flex"
                            alignItems="center"
                          >
                            <FormNumberInput
                              name={`${'accounts'}.${index}.fineCollected`}
                              py="0"
                              h="100%"
                              w="100%"
                              px="s8"
                              minH="inherit"
                              _focus={{ boxShadow: 'none', bg: 'primary.100' }}
                              _focusWithin={{ boxShadow: 'none' }}
                              border="none"
                              onWheel={(e) => e.currentTarget.blur()}
                              borderRadius="0"
                              isDisabled={
                                submissionStatus === 'PENDING' || submissionStatus === 'COMPLETED'
                              }
                            />
                          </Box>

                          <Box
                            as="button"
                            w="s36"
                            minH="s36"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            borderLeft="1px"
                            borderLeftColor="border.layout"
                            cursor={
                              submissionStatus === 'PENDING' || submissionStatus === 'COMPLETED'
                                ? 'not-allowed'
                                : 'pointer'
                            }
                            pointerEvents={
                              submissionStatus === 'PENDING' || submissionStatus === 'COMPLETED'
                                ? 'none'
                                : 'auto'
                            }
                            _focus={{ bg: 'background.500' }}
                            _focusVisible={{ outline: 'none' }}
                            _hover={{ bg: 'gray.100' }}
                            data-testid={`deleteRow-${index}`}
                            onClick={() => {
                              remove(index);
                            }}
                            flexBasis="5%"
                          >
                            <Icon as={IoCloseCircleOutline} color="danger.500" fontSize="2xl" />
                          </Box>
                        </HStack>
                      ))}
                    </Box>

                    <Box
                      w="100%"
                      bg="white"
                      borderBottom="1px"
                      borderX="1px"
                      borderColor="border.layout"
                      borderBottomRadius="br2"
                      h="36px"
                      px="s8"
                      display="flex"
                      alignItems="center"
                      color="gray.600"
                      _hover={{ bg: 'gray.100' }}
                      gap="s4"
                      onClick={() => {
                        // append({});
                        onAddAccountsModalToggle();
                      }}
                      cursor={
                        submissionStatus === 'PENDING' || submissionStatus === 'COMPLETED'
                          ? 'not-allowed'
                          : 'pointer'
                      }
                      pointerEvents={
                        submissionStatus === 'PENDING' || submissionStatus === 'COMPLETED'
                          ? 'none'
                          : 'auto'
                      }
                    >
                      <Icon as={IoAdd} fontSize="xl" color="primary.500" />
                      <Text color="primary.500" fontSize="s3" lineHeight="1.5">
                        New
                      </Text>
                    </Box>
                  </Box>

                  {rejectReason && (
                    <Alert title={`Reject reason: ${rejectReason}`} status="error" hideCloseIcon />
                  )}

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="s4"
                    p="s16"
                    bg="background.500"
                    borderRadius="br2"
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Accounts Collected
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {accounts?.filter(
                          (a) => Number(a?.amountCollected) || Number(a?.fineCollected)
                        )?.length || 0}{' '}
                        / {accounts?.length}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Amount Collected
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {amountConverter(totalAmount)}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Fine Collected
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {amountConverter(totalFine)}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Total Collection
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {amountConverter(totalAmount)}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </FormLayout.Form>
            </FormLayout.Content>

            <FormLayout.Footer
              draftButton={
                submissionStatus === 'COLLECTED' || submissionStatus === 'FAILED' ? (
                  <Button onClick={handleSaveTodayList} variant="outline" minWidth="160px">
                    Save Changes
                  </Button>
                ) : null
              }
              mainButton={
                submissionStatus === 'COLLECTED' || submissionStatus === 'FAILED' ? (
                  <Button
                    onClick={formState.isDirty ? handleSaveAndSubmit : onConfirmModalToggle}
                    minWidth="160px"
                  >
                    Submit Collection Request
                  </Button>
                ) : null
              }
            />
          </>
        )}
      </FormLayout>

      <AddAccountModal
        isOpen={isAddAccountsModalOpen}
        onClose={onAddAccountsModalClose}
        handleAdd={handleAddAccounts}
      />

      <ConfirmationDialog
        isOpen={isConfirmModalOpen}
        onClose={onConfirmModalClose}
        title="Submit Collection Request"
        description="Once collection requested in submitted, it cannot be updated again. Are you sure you want to continue?"
        handleConfirm={handleSubmitCollectionRequest}
      />
    </>
  );
};

export default MRCollectionDetail;

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAdd: (
    accounts: {
      memberId: string;
      memberName: string;
      memberCode: string;
      accountId: string;
      accountName: string;
      amountToBeCollected: string;
      fineToBeCollected: string;
      installmentAmount: string;
      dueInstallments: number;
    }[]
  ) => void;
}

const AddAccountModal = ({ isOpen, onClose, handleAdd }: AddAccountModalProps) => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm<{ memberId: string; accountId: { label: string; value: string }[] }>();

  const { watch, getValues } = methods;

  const user = useAppSelector((state) => state?.auth?.user);

  const agentId = user?.id;

  const { data: assignedMembersListData, isFetching: isMemberListFetching } =
    useListAgentMemberQuery(
      {
        // id: id as string,
        pagination: {
          ...getPaginationQuery(),
          first: -1,
          // order: {
          //   arrange: Arrange.Desc,
          //   column: 'id',
          // },
        },
        filter: {
          orConditions: [
            {
              andConditions: [
                { column: 'agentid', comparator: 'EqualTo', value: agentId as string },
              ],
            },
          ],
        },
      },
      { enabled: !!id }
    );

  const memberList = useMemo(
    () => assignedMembersListData?.agent?.listAgentMember?.edges ?? [],
    [assignedMembersListData]
  );

  const memberOptions = useMemo(
    () =>
      memberList?.map((member) => ({
        label: `${member?.node?.memberName} [${member?.node?.memberCode}]`,
        value: member?.node?.id as string,
      })) ?? [],
    [memberList]
  );

  const memberId = watch('memberId');

  const { data: accountListData, isFetching: isAccountListFetching } = useGetAccountTableListQuery(
    {
      paginate: { ...getPaginationQuery(), first: -1 },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: ObjState.Active,
              },
              {
                column: 'memberId',
                comparator: 'EqualTo',
                value: memberId,
              },
              {
                column: 'nature',
                comparator: 'IN',
                value: [
                  NatureOfDepositProduct.Saving,
                  NatureOfDepositProduct.Current,
                  NatureOfDepositProduct.RecurringSaving,
                ],
              },
            ],
          },
        ],
      },
    },
    { enabled: !!memberId }
  );

  const accountList = useMemo(() => accountListData?.account?.list?.edges ?? [], [accountListData]);

  const accountOptions = useMemo(
    () =>
      accountList?.map((acc) => ({
        label: `${acc?.node?.accountName} [${acc?.node?.id}]`,
        value: acc?.node?.id as string,
      })),
    [accountList]
  );

  const handleSave = () => {
    const values = getValues();

    const temp: {
      memberId: string;
      memberName: string;
      memberCode: string;
      accountId: string;
      accountName: string;
      amountToBeCollected: string;
      fineToBeCollected: string;
      installmentAmount: string;
      dueInstallments: number;
    }[] = [];

    const memberDetail = memberList?.find((m) => m?.node?.id === values?.memberId);

    values?.accountId?.forEach((acc) => {
      const accountDetail = accountList?.find((a) => a?.node?.id === acc?.value);

      temp.push({
        memberId: values?.memberId,
        memberCode: memberDetail?.node?.memberCode as string,
        memberName: memberDetail?.node?.memberName as string,
        accountId: accountDetail?.node?.id as string,
        accountName: accountDetail?.node?.accountName as string,
        amountToBeCollected: accountDetail?.node?.dues?.totalDue as string,
        fineToBeCollected: accountDetail?.node?.dues?.fine as string,
        installmentAmount: accountDetail?.node?.installmentAmount as string,
        dueInstallments: Number(accountDetail?.node?.dues?.dueInstallments || 0),
      });
    });

    handleAdd(temp);

    handleClose();
  };

  const handleClose = () => {
    methods.reset({ accountId: [], memberId: '' });
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title="Add Accounts"
      primaryButtonLabel="Save"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s20" pb="200px">
          <FormSelect
            name="memberId"
            label="Member"
            options={memberOptions}
            isLoading={isMemberListFetching}
          />

          <FormSelect
            name="accountId"
            label="Account"
            options={accountOptions}
            isLoading={isAccountListFetching}
            menuPosition="fixed"
            isMulti
          />
        </Box>
      </FormProvider>
    </Modal>
  );
};
