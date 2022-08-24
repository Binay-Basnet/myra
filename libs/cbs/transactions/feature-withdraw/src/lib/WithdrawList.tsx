import { useMemo } from 'react';

import { useGetWithdrawListDataQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

const tabList = [
  {
    title: 'memberNavActive',
    key: 'APPROVED',
  },
  {
    title: 'memberNavInactive',
    key: 'VALIDATED',
  },
  {
    title: 'memberNavDraft',
    key: 'DRAFT',
  },
];

/* eslint-disable-next-line */
export interface WithdrawListProps {}

export function WithdrawList() {
  const { t } = useTranslation();

  const { data, isFetching } = useGetWithdrawListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(
    () => data?.transaction?.listWithdraw?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Transaction ID',
        accessorFn: (row) => row?.node?.ID,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: 'Name',
        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="s12">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue()}
              </Text>
            </Box>
          );
        },

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
      },
      {
        header: 'Payment Mode',
        accessorFn: (row) => row?.node?.paymentMode,
      },
      {
        header: 'Withdraw By',
        accessorFn: (row) => row?.node?.name?.local,
      },

      {
        header: 'Withdrawn Date',
        accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => {
          const member = cell?.row?.original?.node;
          const memberData = { id: member?.ID };
          return <PopoverComponent items={[]} member={memberData} />;
        },
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <TransactionPageHeader heading={'Withdraw'} tabItems={tabList} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listWithdraw?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listWithdraw?.pageInfo,
        }}
        searchPlaceholder="Search Withdraw"
      />
    </>
  );
}

export default WithdrawList;
