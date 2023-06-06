import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { asyncToast, Box, Text } from '@myra-ui';

import {
  useAgentTodayCollectionMutation,
  useAppSelector,
  useGetAgentAssignedMemberListDataQuery,
  useGetAgentTodayListDataQuery,
} from '@coop/cbs/data-access';
import { BoxContainer } from '@coop/cbs/transactions/ui-containers';
import { localizedText } from '@coop/cbs/utils';
import { FormEditableTable, FormInput, FormLayout } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AddAgentTransactionProps {}

type DepositAccountTable = {
  member: string;
  account: string;
  amount: string;
  memberName?: string;
  id?: string;
};

export const MarketRepresentativeCollectionAdd = () => {
  const user = useAppSelector((state) => state?.auth?.user);

  const router = useRouter();

  const methods = useForm();

  const { getValues, setValue, watch } = methods;

  const agentId = user?.id;

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
      id: agentId as string,
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
        status: record?.status,
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
          amount: record?.amount,
          status: record?.status,
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

  const accounts = watch('accounts');

  useDeepCompareEffect(() => {
    if (accounts?.length) {
      setValue(
        'accounts',
        accounts?.map(
          (record: { id: string; account: string | undefined; member: any; amount: any }) => {
            const account = assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
              (member) => member?.node?.account?.id === record?.account
            );

            return {
              id: record?.id,
              member: record?.member,
              account: record?.account,
              amount: record?.amount || account?.node?.account?.dues?.totalDue,
            };
          }
        )
      );
    }
  }, [accounts, assignedMemberListQueryData]);

  const { mutateAsync: setAgentTodayCollection } = useAgentTodayCollectionMutation();

  const handleSaveTodayList = () => {
    asyncToast({
      id: 'set-agent-today-transaction-collection',
      promise: setAgentTodayCollection({
        agentId: agentId as string,
        data: getValues()['accounts'].map(
          (account: { id: string; member: string; account: string; amount: string }) =>
            account.id
              ? {
                  id: account.id,
                  member: account.member,
                  account: account.account,
                  amount: String(account.amount),
                }
              : {
                  member: account.member,
                  account: account.account,
                  amount: String(account.amount),
                }
        ),
      }),
      msgs: {
        loading: 'Adding Agent Todays Collection',
        success: 'Added Agent Todays Collection',
      },
      onSuccess: () => router.back(),
    });
  };

  useEffect(() => {
    setValue('agentId', [user?.firstName?.local, user?.lastName?.local].join(' '));
  }, [user]);

  return (
    <FormLayout methods={methods} hasSidebar>
      <FormLayout.Header
        title="New Market Representative Collection"
        buttonHandler={() => router.back()}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box p="s16" pb="100px" width="100%" display="flex" flexDirection="column" gap="s32">
            <FormInput name="agentId" label="Market Representative" isDisabled />

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
                        const item = todaysList?.find(
                          (account) => account?.account === row?.account
                        );

                        return !!item?.status && item?.status !== 'PENDING';
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
                        const item = todaysList?.find(
                          (account) => account?.account === row?.account
                        );

                        return !!item?.status && item?.status !== 'PENDING';
                      },
                    },
                    {
                      accessor: 'amount',
                      header: 'Amount',
                      isNumeric: true,
                      cellWidth: 'lg',
                      getDisabled: (row) => {
                        const item = todaysList?.find(
                          (account) => account?.account === row?.account
                        );

                        return !!item?.status && item?.status !== 'PENDING';
                      },
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
                  ]}
                  // defaultData={todaysList}
                  searchPlaceholder="Search or add member"
                  canDeleteRow
                />
              </BoxContainer>
            )}
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Save Collection"
        mainButtonHandler={handleSaveTodayList}
      />
    </FormLayout>
  );
};

export default MarketRepresentativeCollectionAdd;