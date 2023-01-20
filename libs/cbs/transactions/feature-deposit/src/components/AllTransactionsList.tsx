import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { Filter_Mode, useGetAllTransactionsListQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter, featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const AllTransactionsList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetAllTransactionsListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      id: searchTerm,
      transactionId: searchTerm,
      txnType: searchTerm,
      filterMode: Filter_Mode.Or,
    },
  });

  const rowData = useMemo(() => data?.transaction?.listAllTransactions?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local?.split(' ')[0] ?? 'N/A',
      },
      {
        header: 'Txn ID',
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
        header: 'Note',
        accessorFn: (row) => row?.node?.narration,
        cell: (props) => <Tooltip title={props?.row?.original?.node?.narration as string} />,
        meta: {
          width: '20%',
        },
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branchName,
      },

      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
          width: '2%',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <TransactionPageHeader heading={`All Transactions - ${featureCode?.allTransactionList}`} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(
            `${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${row?.node?.id}&txnType=${row?.node?.transactionType}`
          )
        }
        pagination={{
          total: data?.transaction?.listAllTransactions?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listAllTransactions?.pageInfo,
        }}
        searchPlaceholder="Search all transactions"
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default AllTransactionsList;
