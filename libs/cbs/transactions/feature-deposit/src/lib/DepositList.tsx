import { useMemo } from 'react';

import { useGetDepositListDataQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

const tabList = [
  {
    title: 'memberNavActive',
    key: 'ACTIVE',
  },
  {
    title: 'memberNavInactive',
    key: 'SUBMITTED',
  },
];

/* eslint-disable-next-line */
export interface DepositListProps {}

export function DepositList() {
  const { t } = useTranslation();

  const { data, isFetching } = useGetDepositListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(
    () => data?.transaction?.listDeposit?.edges ?? [],
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
        header: 'Payment Mode',
        accessorFn: (row) => row?.node?.paymentMode,
      },
      {
        header: 'Deposited By',
        accessorFn: (row) => row?.node?.processedBy,
      },

      {
        header: 'Deposit Date',
        accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      },
      {
        header: 'Amount',

        accessorFn: (row) => row?.node?.amount,
        meta: {
          isNumeric: true,
        },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent items={[]} member={cell?.row?.original?.node} />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <TransactionPageHeader heading={'Deposit'} tabItems={tabList} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listDeposit?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listDeposit?.pageInfo,
        }}
        searchPlaceholder="Search Deposit"
      />
    </>
  );
}

export default DepositList;
