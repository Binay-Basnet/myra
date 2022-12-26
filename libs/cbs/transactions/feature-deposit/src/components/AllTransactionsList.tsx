import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetAllTransactionsListQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { amountConverter, getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const AllTransactionsList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetAllTransactionsListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.transaction?.listAllTransactions?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['depositListTransactionId'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.transactionType,
        header: 'Type',
        cell: (props) => (
          <Box textTransform="capitalize">
            {' '}
            {props?.cell?.row?.original?.node?.transactionType?.toLowerCase()?.replace(/_/g, ' ')}
          </Box>
        ),
      },
      {
        header: 'Narration',
        accessorFn: (row) => row?.node?.narration,
        meta: {
          width: '20%',
        },
      },

      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
          width: '20%',
        },
      },
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local?.split(' ')[0] ?? 'N/A',
      },
    ],
    [t]
  );

  return (
    <>
      <TransactionPageHeader heading="All Transactions" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(
            `/transactions/all-transactions/view?id=${row?.node?.id}&txnType=${row?.node?.transactionType}`
          )
        }
        pagination={{
          total: data?.transaction?.listAllTransactions?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listAllTransactions?.pageInfo,
        }}
        searchPlaceholder="Search all transactions"
      />
    </>
  );
};

export default AllTransactionsList;
