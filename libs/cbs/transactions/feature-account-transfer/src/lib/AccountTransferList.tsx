import { useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  Arrange,
  useGetAccountTransferListDataQuery,
} from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { DEFAULT_PAGE_SIZE } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

// const tabList = [
//   {
//     title: 'memberNavActive',
//     key: 'ACTIVE',
//   },
//   {
//     title: 'memberNavInactive',
//     key: 'SUBMITTED',
//   },
// ];

/* eslint-disable-next-line */
export interface AccountTransferListProps {}

export function AccountTransferList() {
  const { t } = useTranslation();

  const router = useRouter();
  const { data, isFetching } = useGetAccountTransferListDataQuery(
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
    () => data?.transaction?.listTransfer?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date ?? 'N/A',
      },
      {
        header: 'Transaction ID',
        accessorFn: (row) => row?.node?.ID,
      },
      // {
      //   accessorFn: (row) => row?.node?.name?.local,
      //   header: 'Name',
      //   cell: (props) => {
      //     return (
      //       <Box display="flex" alignItems="center" gap="s12">
      //         <Avatar
      //           name="Dan Abrahmov"
      //           size="sm"
      //           src="https://bit.ly/dan-abramov"
      //         />
      //         <Text
      //           fontSize="s3"
      //           textTransform="capitalize"
      //           textOverflow="ellipsis"
      //           overflow="hidden"
      //         >
      //           {props.getValue()}
      //         </Text>
      //       </Box>
      //     );
      //   },

      //   meta: {
      //     width: '40%',
      //   },
      // },
      {
        header: 'Transaction Type',
        accessorFn: (row) => row?.node?.transferType,
        meta: {
          width: '40%',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
      },
      // {
      //   header: 'Payment Mode',
      //   accessorFn: (row) => row?.node?.paymentMode,
      // },
      // {
      //   header: 'Deposited By',
      //   accessorFn: (row) => row?.node?.processedBy,
      // },

      // {
      //   header: 'Deposit Date',
      //   accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      // },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: () => <PopoverComponent items={[]} />,
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <TransactionPageHeader
        heading={'Account Transfer List'}
        // tabItems={tabList}
        buttonLabel={'New Account Transfer'}
        buttonHandler={() => router.push('/transactions/account-transfer/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listTransfer?.totalCount ?? 'Many',
          endCursor: data?.transaction?.listTransfer.pageInfo?.endCursor ?? '',
          startCursor:
            data?.transaction?.listTransfer.pageInfo?.startCursor ?? '',
        }}
        searchPlaceholder="Search"
      />
    </>
  );
}

export default AccountTransferList;
