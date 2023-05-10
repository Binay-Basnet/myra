import { useMemo } from 'react';
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
import { featureCode } from '@coop/shared/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AddAgentTransactionProps {}

type DepositAccountTable = {
  member: string;
  account: string;
  amount: string;
  memberName?: string;
  paid: boolean;
};

export const AddAgentTransaction = () => {
  const router = useRouter();

  const methods = useForm();

  const { watch, getValues } = methods;

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

      assignedMemberListQueryData?.transaction?.assignedMemberList?.edges?.forEach((member) => {
        if (member?.node?.member?.id === mId) {
          tempAccountList.push({
            label: member?.node?.product?.productName as string,
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
      agentTodayListQueryData?.transaction?.listAgentTask?.record?.map((record) => ({
        id: record?.id,
        member: record?.member?.id as string,
        account: record?.account?.id as string,
        amount: record?.amount,
        paid: Boolean(record?.paid),
      })),
    [agentTodayListQueryData]
  );

  // const { data: memberListQueryData } = useGetAgentAssignedMemberListDataQuery(
  //   {
  //     pagination: getPaginationQuery(),
  //     filter: {
  //       orConditions: [
  //         {
  //           andConditions: [
  //             {
  //               column: 'agentId',
  //               comparator: 'EqualTo',
  //               value: agentId,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  //   { enabled: !!agentId }
  // );

  const memberListSearchOptions = useMemo(() => {
    const tempMembers: { label: string; value: string }[] = [];
    const tempIds: string[] = [];

    assignedMemberListQueryData?.transaction?.assignedMemberList?.edges?.forEach((member) => {
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
            paid: boolean;
          }) =>
            account.id
              ? {
                  id: account.id,
                  member: account.member,
                  account: account.account,
                  amount: String(account.amount),
                  paid: account.paid,
                }
              : {
                  member: account.member,
                  account: account.account,
                  amount: String(account.amount),
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

  return (
    <FormLayout methods={methods}>
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
                        const memberName =
                          assignedMemberListQueryData?.transaction?.assignedMemberList?.edges?.find(
                            (member) => member?.node?.member?.id === row?.member
                          )?.node?.member?.name;

                        return (
                          <Box display="flex" flexDirection="column" py="s4">
                            <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-80">
                              {localizedText(memberName)}
                            </Text>
                            <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
                              {row?.member}
                            </Text>
                          </Box>
                        );
                      },
                    },
                    {
                      accessor: 'account',
                      header: 'Account',
                      loadOptions: (row) => getMemberAccounts(row?.member),
                      fieldType: 'select',
                      cellWidth: 'lg',
                    },
                    {
                      accessor: 'amount',
                      header: 'Amount',
                      isNumeric: true,
                    },
                    {
                      accessor: 'paid',
                      header: 'Payment Confirm',
                      fieldType: 'checkbox',
                    },
                  ]}
                  defaultData={todaysList}
                  searchPlaceholder="Search or add member"
                  canDeleteRow
                />
              </BoxContainer>
            )}
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Save Transaction"
        mainButtonHandler={handleSaveTodayList}
      />
    </FormLayout>
  );
};

export default AddAgentTransaction;
