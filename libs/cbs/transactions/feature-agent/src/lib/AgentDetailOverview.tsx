import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  useGetAccountTableListQuery,
  useGetAgentAssignedMemberListDataQuery,
  useGetAgentTodayListDataQuery,
  useSetAgentTodayListDataMutation,
} from '@coop/cbs/data-access';
import { AssignedMembersCard } from '@coop/cbs/transactions/ui-components';
import { FormEditableTable } from '@coop/shared/form';
import {
  Alert,
  asyncToast,
  Box,
  Button,
  DEFAULT_PAGE_SIZE,
  DetailPageContentCard,
} from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AgentDetailOverviewProps {}

type DepositAccountTable = {
  member: string;
  account: string;
  amount: string;
  memberName: string;
};

// const URL = process.env['NX_SCHEMA_PATH'] ?? '';

export function AgentDetailOverview() {
  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { getValues, reset } = methods;

  const [showMemberTable, setShowMemberTable] = useState<boolean>(false);

  const [memberId, setMemberId] = useState<string>('');

  const { refetch } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      enabled: !!memberId,
    }
  );

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
        accounts:
          agentTodayListQueryData?.transaction?.listAgentTask?.record?.map(
            (record) => ({
              member: record?.member?.id,
              account: record?.account?.id,
              amount: record?.amount,
            })
          ),
      });
    }
  }, [agentTodayListQueryData]);

  const getMemberAccounts = async (memberId: string) => {
    setMemberId(memberId);

    const response = await refetch();

    return new Promise<{ label: string; value: string }[]>((resolve) => {
      resolve(
        response?.data?.account?.list?.edges?.map((account) => ({
          label: account?.node?.product?.productName,
          value: account?.node?.id,
        })) as { label: string; value: string }[]
      );
    });
  };

  const { data: memberListQueryData } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        agentId: id as string,
      },
    },
    { enabled: !!id }
  );

  const memberListSearchOptions = useMemo(
    () =>
      memberListQueryData?.transaction?.assignedMemberList?.edges?.map(
        (member) => ({
          label: member?.node?.member?.name?.local as string,
          value: member?.node?.member?.id as string,
        })
      ) ?? [],
    [memberListQueryData]
  );

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
        accounts:
          agentTodayListQueryData?.transaction?.listAgentTask?.record?.map(
            (record) => ({
              member: record?.member?.id,
              account: record?.account?.id,
              amount: record?.amount,
            })
          ),
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
          showUndo={true}
          undoText="Create Today's List"
          undoHandler={() => setShowMemberTable(true)}
        />
      )}

      {showMemberTable && (
        <DetailPageContentCard
          header="Today's List"
          showFooter={true}
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
                    // cell: (row) => (
                    //   <Box display="flex" flexDirection="column" gap="s4">
                    //     <Text
                    //       fontSize="r1"
                    //       fontWeight={500}
                    //       color="neutralColorLight.Gray-80"
                    //     >
                    //       {row?.memberName}
                    //     </Text>
                    //     <Text
                    //       fontSize="s3"
                    //       fontWeight={500}
                    //       color="neutralColorLight.Gray-60"
                    //     >
                    //       {row?.memberId}
                    //     </Text>
                    //   </Box>
                    // ),
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
                canDeleteRow={true}
                // canAddRow={false}
              />
            </FormProvider>
          </Box>
        </DetailPageContentCard>
      )}
    </Box>
  );
}

export default AgentDetailOverview;
