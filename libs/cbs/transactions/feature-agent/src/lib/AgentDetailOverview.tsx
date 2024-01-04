import { useMemo, useRef, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { BsPrinter } from 'react-icons/bs';
import { IoAdd, IoAddOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { useReactToPrint } from 'react-to-print';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { HStack, Spinner, useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  Alert,
  asyncToast,
  Box,
  Button,
  Chips,
  DetailPageContentCard,
  FormSection,
  Icon,
  Modal,
  Text,
} from '@myra-ui';

import {
  ObjState,
  useAddAgentTodayListMutation,
  useGetAccountTableListQuery,
  useGetAgentTodayListDataQuery,
  useListAgentMemberQuery,
  useListCollectionQuery,
  useListCollectionTemplateQuery,
} from '@coop/cbs/data-access';
import { AssignedMembersCard } from '@coop/cbs/transactions/ui-components';
import { FormNumberInput, FormSelect } from '@coop/shared/form';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { TodaysListPrint } from '../components';

/* eslint-disable-next-line */
export interface AgentDetailOverviewProps {}

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

const getAmountToCollect = (
  dueInstallment: number,
  dueAmount: number,
  dueFine: number,
  installmentAmount: number
) => {
  if (!dueAmount) {
    return '';
  }

  if (!dueInstallment) {
    if (dueFine) {
      return `[Rs.${amountConverter(Number(dueAmount) - Number(dueFine))} + Rs.${amountConverter(
        dueFine
      )}]`;
    }
    return `[Rs.${amountConverter(dueAmount)}]`;
  }

  if (dueFine) {
    return `[${dueInstallment} x Rs.${amountConverter(installmentAmount)} + Rs.${amountConverter(
      dueFine
    )}]`;
  }

  return `[${dueInstallment} x Rs.${amountConverter(installmentAmount)}]`;
};

export const AgentDetailOverview = () => {
  const { t } = useTranslation();

  const componentRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm<TodaysList>();

  const { getValues, reset, control, setValue } = methods;

  const [showMemberTable, setShowMemberTable] = useState<boolean>(false);

  const {
    isOpen: isAddAccountsModalOpen,
    onClose: onAddAccountsModalClose,
    onToggle: onAddAccountsModalToggle,
  } = useDisclosure();

  const { data: agentTodayListQueryData } = useGetAgentTodayListDataQuery(
    {
      id: id as string,
    },
    { staleTime: 0, enabled: !!id }
  );

  const submissionId = useMemo(
    () => agentTodayListQueryData?.agent?.listAgentTask?.submissionId,
    [agentTodayListQueryData]
  );

  useDeepCompareEffect(() => {
    if (agentTodayListQueryData?.agent?.listAgentTask?.record?.length) {
      setShowMemberTable(true);

      reset({
        accounts: agentTodayListQueryData?.agent?.listAgentTask?.record?.map((record) => ({
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
        })) as AccountsEntry[],
      });
    }
  }, [agentTodayListQueryData]);

  const { mutateAsync: addAgentTodayList } = useAddAgentTodayListMutation();

  const handleSaveTodayList = () => {
    const values = getValues();

    asyncToast({
      id: 'set-agent-today-list',
      promise: addAgentTodayList({
        input: {
          agentId: id as string,
          submissionId,
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
        loading: 'Adding today list',
        success: 'Today list added',
      },
      onSuccess: () => queryClient.invalidateQueries(['getAgentTodayListData']),
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { fields, remove } = useFieldArray({ name: 'accounts', control });

  const { data: collectionListData } = useListCollectionQuery({ agentID: id as string });

  const collectionList = collectionListData?.collection?.listCollection?.data ?? [];

  const [selectedCollectionId, setSelectedCollectionId] = useState('');

  const { isFetching: isTemplateFetching } = useListCollectionTemplateQuery(
    {
      collectionID: selectedCollectionId,
    },
    {
      enabled: !!selectedCollectionId,
      onSuccess: (res) => {
        const collectionDetail = res?.collection?.listCollectionTemplate;

        const values = getValues();

        const formAccounts = values?.['accounts']?.map((row) => row?.accountId) ?? [];

        const accountsToAdd = collectionDetail?.data?.filter(
          (row) => !formAccounts?.includes(row?.accountId as string)
        );

        setValue('accounts', [
          ...(values?.['accounts'] ?? []),
          ...(accountsToAdd?.map((acc) => ({
            memberId: acc?.memberID,
            memberName: acc?.memberName,
            memberCode: acc?.memberCode,
            accountId: acc?.accountId,
            accountName: acc?.accountName,
            amountToBeCollected: acc?.AmountToBeCollected,
            fineToBeCollected: acc?.FineToBeCollected,
          })) ?? []),
        ] as AccountsEntry[]);

        setSelectedCollectionId('');
      },
    }
  );

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

  const handleDiscardChanges = () => {
    if (agentTodayListQueryData?.agent?.listAgentTask?.record?.length) {
      reset({
        accounts: agentTodayListQueryData?.agent?.listAgentTask?.record?.map((record) => ({
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
        })) as AccountsEntry[],
      });
    } else {
      reset({ accounts: [] });
      setShowMemberTable(false);
    }
  };

  const accounts = methods.watch('accounts');

  const totalAmount = accounts?.reduce((sum, acc) => sum + Number(acc?.amountCollected || 0), 0);
  const totalFine = accounts?.reduce((sum, acc) => sum + Number(acc?.fineCollected || 0), 0);

  return (
    <>
      <Box display="flex" flexDirection="column" gap="s16">
        <AssignedMembersCard />

        {!showMemberTable && (
          <Alert
            status="info"
            title={t['agentOverviewCreateTodaysList']}
            showUndo
            undoText={t['agentOverviewCreateTodaysList']}
            undoHandler={() => setShowMemberTable(true)}
          />
        )}

        {showMemberTable && (
          <DetailPageContentCard
            header={t['agentOverviewTodaysList']}
            showFooter
            footerButtons={
              <>
                <Button variant="ghost" onClick={handleDiscardChanges}>
                  {t['agentOverviewDiscard']}
                </Button>

                <Button onClick={handleSaveTodayList}>{t['agentOverviewSaveChanges']}</Button>
              </>
            }
            headerButtons={
              <Box>
                <Button
                  leftIcon={<Icon as={BsPrinter} />}
                  variant="outline"
                  shade="neutral"
                  onClick={handlePrint}
                >
                  Print Saved List
                </Button>
              </Box>
            }
          >
            {/* <Box p="s16"> */}
            <FormProvider {...methods}>
              <FormSection templateColumns={1}>
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="r1" fontWeight={400} color="gray.600">
                    Add Members from your Collections or Add Manually
                  </Text>

                  <Box display="flex" alignItems="center" gap="s4">
                    {collectionList?.map((coll) => (
                      <Chips
                        size="lg"
                        theme="neutral"
                        type="status"
                        variant="outline"
                        label={coll?.collectionName as string}
                        icon={
                          coll?.collectionID === selectedCollectionId && isTemplateFetching ? (
                            <Spinner size="sm" />
                          ) : (
                            <Icon as={IoAddOutline} />
                          )
                        }
                        cursor={isTemplateFetching ? 'not-allowed' : 'pointer'}
                        onClick={() => setSelectedCollectionId(coll?.collectionID as string)}
                        pointerEvents={isTemplateFetching ? 'none' : 'auto'}
                      />
                    ))}
                  </Box>
                </Box>
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
                              Number(item?.dueInstallments),
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
                          cursor={router?.asPath?.includes('/view') ? 'not-allowed' : 'pointer'}
                          pointerEvents={router?.asPath?.includes('/view') ? 'none' : 'auto'}
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
                    cursor="pointer"
                    gap="s4"
                    onClick={() => {
                      // append({});
                      onAddAccountsModalToggle();
                    }}
                  >
                    <Icon as={IoAdd} fontSize="xl" color="primary.500" />
                    <Text color="primary.500" fontSize="s3" lineHeight="1.5">
                      New
                    </Text>
                  </Box>
                </Box>

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
              </FormSection>
            </FormProvider>
            {/* </Box> */}
          </DetailPageContentCard>
        )}

        <TodaysListPrint ref={componentRef} />
      </Box>

      <AddAccountModal
        isOpen={isAddAccountsModalOpen}
        onClose={onAddAccountsModalClose}
        handleAdd={handleAddAccounts}
      />
    </>
  );
};

export default AgentDetailOverview;

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
            { andConditions: [{ column: 'agentid', comparator: 'EqualTo', value: id as string }] },
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
