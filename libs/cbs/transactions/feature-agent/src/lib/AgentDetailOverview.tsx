import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  useGetAgentAssignedMemberListDataQuery,
  useGetAgentTodayListDataQuery,
  useSetAgentTodayListDataMutation,
} from '@coop/cbs/data-access';
import { AssignedMembersCard } from '@coop/cbs/transactions/ui-components';
import { FormEditableTable } from '@coop/shared/form';
import { Alert, asyncToast, Box, Button, DetailPageContentCard, Text } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface AgentDetailOverviewProps {}

type DepositAccountTable = {
  member: string;
  account: string;
  amount: string;
  memberName: string;
};

export const AgentDetailOverview = () => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { getValues, reset } = methods;

  const [showMemberTable, setShowMemberTable] = useState<boolean>(false);

  const { data: agentTodayListQueryData } = useGetAgentTodayListDataQuery(
    {
      id: id as string,
    },
    { staleTime: 0 }
  );

  useEffect(() => {
    if (agentTodayListQueryData?.transaction?.listAgentTask?.record?.length) {
      setShowMemberTable(true);

      reset({
        accounts: agentTodayListQueryData?.transaction?.listAgentTask?.record?.map((record) => ({
          member: record?.member?.id,
          account: record?.account?.id,
          amount: record?.amount,
        })),
      });
    }
  }, [agentTodayListQueryData]);

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

  const { data: assignedMemberListQueryData } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: {
        first: -1,
        after: '',
      },
      filter: {
        agentId: id as string,
      },
    },
    { enabled: !!id }
  );

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

  const { mutateAsync: setAgentTodayList } = useSetAgentTodayListDataMutation();

  const handleSaveTodayList = () => {
    asyncToast({
      id: 'set-agent-today-list',
      promise: setAgentTodayList({
        id: id as string,
        data: getValues()['accounts'].map(
          (account: { member: string; account: string; amount: string }) => ({
            member: account.member,
            account: account.account,
            amount: String(account.amount),
          })
        ),
      }),
      msgs: {
        loading: "Adding Today's List",
        success: "Added Today's List",
      },
      onSuccess: () => null,
    });
  };

  const handleDiscardChanges = () => {
    if (agentTodayListQueryData?.transaction?.listAgentTask?.record?.length) {
      reset({
        accounts: agentTodayListQueryData?.transaction?.listAgentTask?.record?.map((record) => ({
          member: record?.member?.id,
          account: record?.account?.id,
          amount: record?.amount,
        })),
      });
    } else {
      setShowMemberTable(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <AssignedMembersCard />

      {!showMemberTable && (
        <Alert
          status="info"
          title="Create Today's List"
          showUndo
          undoText="Create Today's List"
          undoHandler={() => setShowMemberTable(true)}
        />
      )}

      {showMemberTable && (
        <DetailPageContentCard
          header="Today's List"
          showFooter
          footerButtons={
            <>
              <Button variant="ghost" onClick={handleDiscardChanges}>
                Discard
              </Button>

              <Button onClick={handleSaveTodayList}>Save Changes</Button>
            </>
          }
        >
          <Box p="s16">
            <FormProvider {...methods}>
              <FormEditableTable<DepositAccountTable>
                name="accounts"
                columns={[
                  {
                    accessor: 'member',
                    header: 'Member',
                    cellWidth: 'auto',
                    fieldType: 'search',
                    searchOptions: memberListSearchOptions,
                    cell: (row) => {
                      const memberName = memberListSearchOptions?.find(
                        (member) => member.value === row.member
                      )?.label;

                      return (
                        <Box display="flex" flexDirection="column" py="s4">
                          <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-80">
                            {memberName}
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
                    // isNumeric: true,
                    loadOptions: (row) => getMemberAccounts(row?.member),
                    fieldType: 'select',
                    cellWidth: 'lg',
                  },
                  {
                    accessor: 'amount',
                    header: 'Amount',
                    isNumeric: true,
                    // accessorFn: (row) =>
                    //   row.quantity
                    //     ? Number(row.value) * Number(row.quantity)
                    //     : '0',
                  },
                ]}
                // defaultData={accountListDefaultData}
                searchPlaceholder="Search or add member"
                canDeleteRow
                // canAddRow={false}
              />
            </FormProvider>
          </Box>
        </DetailPageContentCard>
      )}
    </Box>
  );
};

export default AgentDetailOverview;
