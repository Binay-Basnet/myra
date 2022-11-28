import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetDepositListDataQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { amountConverter, getRouterQuery, useTranslation } from '@coop/shared/utils';

// const MEMBER_TAB_ITEMS = [
//   {
//     title: 'memberNavActive',
//     key: 'APPROVED',
//   },
//   {
//     title: 'memberNavInactive',
//     key: 'VALIDATED',
//   },
//   {
//     title: 'memberNavDraft',
//     key: 'DRAFT',
//   },
// ];

export const AgentTransactionList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // const { data, isFetching } = useGetMemberListQuery({
  //   pagination: getRouterQuery({ type: ['PAGINATION'] }),
  //   filter: {
  //     objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
  //   },
  // });

  const { data, isFetching } = useGetDepositListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: { depositedBy: 'agent' },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.listDeposit?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        header: 'Transaction ID',
        accessorFn: (row) => row?.node?.ID,
      },
      {
        accessorFn: (row) => row?.node?.agentName,
        header: 'Market Representative Name',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.agentPicUrl ?? ''}
            />
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: t['transDetailViewDetail'],
                  onClick: (row) => {
                    router.push(
                      `/transactions/agent-transaction/view?id=${row?.agentId}&date=${row?.date}`
                    );
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading="Market Representative Transaction" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(
            `/transactions/agent-transaction/view?id=${row?.node?.agentId}&date=${row?.node?.date}`
          )
        }
        noDataTitle="Market Representative Transaction"
        pagination={{
          total: data?.transaction?.listDeposit?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listDeposit?.pageInfo,
        }}
      />
    </>
  );
};

export default AgentTransactionList;
