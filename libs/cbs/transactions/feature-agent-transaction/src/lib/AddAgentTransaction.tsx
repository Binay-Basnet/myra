import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Text } from '@myra-ui';

import {
  useGetAgentAssignedMemberListDataQuery,
  useGetAgentTodayListDataQuery,
  useSetAgentTodayDepositDataMutation,
} from '@coop/cbs/data-access';
import { BoxContainer } from '@coop/cbs/transactions/ui-containers';
import { localizedText } from '@coop/cbs/utils';
import { FormAgentSelect, FormEditableTable, FormLayout } from '@coop/shared/form';
import { amountConverter, featureCode } from '@coop/shared/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AddAgentTransactionProps {}

type DepositAccountTable = {
  id?: string;
  member: string;
  account: string;
  amount: string;
  fine: string;
  memberName?: string;
  paid: boolean;
};

export const AddAgentTransaction = () => {
  const router = useRouter();

  const methods = useForm();

  const { watch, getValues, setValue } = methods;

  const agentId: string = watch('agentId');

  const { data: assignedMemberListQueryData } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: {
        first: -1,
        after: '',
      },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'agentId',
                comparator: 'EqualTo',
                value: agentId,
              },
            ],
          },
        ],
      },
    },
    { enabled: !!agentId, staleTime: 0 }
  );

  const getMemberAccounts = async (mId: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      const tempAccountList: { label: string; value: string }[] = [];

      assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.forEach((member) => {
        if (member?.node?.member?.id === mId) {
          tempAccountList.push({
            label: member?.node?.account?.accountName as string,
            value: member?.node?.account?.id as string,
          });
        }
      });

      resolve(tempAccountList);
    });

  const { data: agentTodayListQueryData } = useGetAgentTodayListDataQuery(
    {
      id: agentId,
    },
    { staleTime: 0, enabled: !!agentId }
  );

  const todaysList = useMemo(
    () =>
      agentTodayListQueryData?.agent?.listAgentTask?.record?.map((record) => ({
        id: record?.id,
        member: record?.member?.id as string,
        account: record?.account?.id as string,
        amount: record?.amount,
        paid: Boolean(record?.paid),
      })),
    [agentTodayListQueryData]
  );

  useEffect(() => {
    if (agentTodayListQueryData) {
      setValue(
        'accounts',
        agentTodayListQueryData?.agent?.listAgentTask?.record?.map((record) => ({
          id: record?.id,
          member: record?.member?.id as string,
          account: record?.account?.id as string,
          amount: Number(record?.amount || 0) - Number(record?.fine || 0),
          fine: record?.fine,
          status: record?.status,
          paid: Boolean(record?.paid),
        }))
      );
    }
  }, [agentTodayListQueryData]);

  const memberListSearchOptions = useMemo(() => {
    const tempMembers: { label: string; value: string }[] = [];
    const tempIds: string[] = [];

    assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.forEach((member) => {
      if (!tempIds.includes(member?.node?.member?.id as string)) {
        tempIds.push(member?.node?.member?.id as string);
        tempMembers.push({
          label: member?.node?.member?.name?.local as string,
          value: member?.node?.member?.id as string,
        });
      }
    });

    return tempMembers;
  }, [assignedMemberListQueryData]);

  const { mutateAsync: setAgentTodayList } = useSetAgentTodayDepositDataMutation();

  const handleSaveTodayList = () => {
    asyncToast({
      id: 'set-agent-today-transaction-confirm',
      promise: setAgentTodayList({
        id: agentId,
        data: getValues()['accounts'].map(
          (account: {
            id: string;
            member: string;
            account: string;
            amount: string;
            fine: string;
            paid: boolean;
          }) =>
            account.id
              ? {
                  id: account.id,
                  member: account.member,
                  account: account.account,
                  amount: String(Number(account.amount || 0) + Number(account.fine || 0)),
                  fine: String(account.fine),
                  paid: account.paid,
                }
              : {
                  member: account.member,
                  account: account.account,
                  amount: String(Number(account.amount || 0) + Number(account.fine || 0)),
                  fine: String(account.fine),
                  paid: account.paid,
                }
        ),
      }),
      msgs: {
        loading: 'Adding Agent Todays Transaction',
        success: 'Added Agent Todays Transaction',
      },
      onSuccess: () => router.back(),
    });
  };

  const accounts = watch('accounts');

  const isMainButtonDisabled = useMemo(
    () => !accounts?.find((account: { paid: boolean }) => account?.paid),
    [accounts]
  );

  return (
    <FormLayout methods={methods} hasSidebar>
      <FormLayout.Header
        title={`New Market Representative Transaction - ${featureCode?.newMarketRepresentativeTransaction}`}
        buttonHandler={() => router.back()}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box p="s16" pb="100px" width="100%" display="flex" flexDirection="column" gap="s32">
            <Box display="flex" flexDirection="column" gap="s16">
              <Text>Market Representative Transaction</Text>

              <FormAgentSelect
                isRequired
                name="agentId"
                label="Market Representative"
                currentBranchOnly
              />
            </Box>

            {agentId && (
              <BoxContainer>
                <Text fontSize="r1" fontWeight={600} color="gray.800">
                  Assigned Member List
                </Text>

                <FormEditableTable<DepositAccountTable>
                  name="accounts"
                  columns={[
                    {
                      accessor: 'member',
                      header: 'Member',
                      cellWidth: 'auto',
                      fieldType: 'select',
                      selectOptions: memberListSearchOptions,
                      cell: (row) => {
                        const selectedMember =
                          assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
                            (member) => member?.node?.member?.id === row?.member
                          )?.node?.member;

                        return (
                          <Box display="flex" flexDirection="column" py="s4">
                            <Text
                              fontSize="r1"
                              fontWeight={500}
                              color="neutralColorLight.Gray-80"
                              maxW="32ch"
                              textOverflow="ellipsis"
                              overflow="hidden"
                            >
                              {localizedText(selectedMember?.name)}
                            </Text>
                            <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
                              {selectedMember?.code}
                            </Text>
                          </Box>
                        );
                      },
                      getDisabled: (row) => {
                        const item = todaysList?.find((account) => account?.id === row?.id);

                        return !!item?.paid;
                      },
                    },
                    {
                      accessor: 'account',
                      header: 'Account',
                      loadOptions: (row) => getMemberAccounts(row?.member),
                      fieldType: 'select',
                      cellWidth: 'auto',
                      cell: (row) => {
                        const selectedMember =
                          assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
                            (member) => member?.node?.account?.id === row?.account
                          )?.node?.account;

                        return (
                          <Box display="flex" flexDirection="column" py="s4">
                            <Text
                              fontSize="r1"
                              fontWeight={500}
                              color="neutralColorLight.Gray-80"
                              maxW="32ch"
                              textOverflow="ellipsis"
                              overflow="hidden"
                            >
                              {selectedMember?.accountName}
                            </Text>
                            <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
                              {selectedMember?.id}
                            </Text>
                          </Box>
                        );
                      },
                      getDisabled: (row) => {
                        const item = todaysList?.find((account) => account?.id === row?.id);

                        return !!item?.paid;
                      },
                    },
                    {
                      accessor: 'amount',
                      header: 'Amount',
                      isNumeric: true,
                      cellWidth: 'lg',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'fine',
                      header: 'Fine',
                      isNumeric: true,
                      cellWidth: 'lg',
                      getDisabled: () => true,
                    },
                    {
                      id: 'installmentAmount',
                      header: 'Installment Amount',
                      accessor: 'account',
                      cell: (row) => {
                        const selectedAccount =
                          assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
                            (item) => item?.node?.account?.id === row?.account
                          )?.node?.account;

                        return (
                          <Box textAlign="right">
                            {selectedAccount?.installmentAmount
                              ? amountConverter(selectedAccount?.installmentAmount || 0)
                              : 'N/A'}
                          </Box>
                        );
                      },
                      isNumeric: true,
                      cellWidth: 'lg',
                    },
                    {
                      accessor: 'paid',
                      header: '',
                      fieldType: 'checkbox',
                      getDisabled: (row) => {
                        const item = todaysList?.find((account) => account?.id === row?.id);

                        return !!item?.paid;
                      },
                      cellWidth: 'sm',
                    },
                  ]}
                  // defaultData={todaysList}
                  searchPlaceholder="Search or add member"
                  canDeleteRow={false}
                />
              </BoxContainer>
            )}
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Save Transaction"
        mainButtonHandler={handleSaveTodayList}
        isMainButtonDisabled={isMainButtonDisabled}
      />
    </FormLayout>
  );
};

export default AddAgentTransaction;
