import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Arrange, useGetWithdrawListDataQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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

  const router = useRouter();
  const { data, isFetching } = useGetWithdrawListDataQuery(
    {
      pagination: router.query['before']
        ? {
            first: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            after: router.query['before'] as string,
            order: {
              column: 'ID',
              arrange: Arrange.Desc,
            },
          }
        : {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
            order: {
              column: 'ID',
              arrange: Arrange.Desc,
            },
          },
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
      <TransactionPageHeader heading={'Withdraw'} tabItems={tabList} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listWithdraw?.totalCount ?? 'Many',
          endCursor: data?.transaction?.listWithdraw.pageInfo?.endCursor ?? '',
          startCursor:
            data?.transaction?.listWithdraw.pageInfo?.startCursor ?? '',
        }}
        searchPlaceholder="Search Withdraw"
      />
    </>
  );
}

export default WithdrawList;
