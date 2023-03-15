import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  useGetAllTransactionFilterMappingQuery,
  useGetAllTransactionsListQuery,
} from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const AllTransactionsList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: allTransactionFilterMapping } = useGetAllTransactionFilterMappingQuery();
  const { data, isFetching } = useGetAllTransactionsListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.transaction?.listAllTransactions?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: 'Date',
        cell: (props) => props?.row?.original?.node?.date?.local?.split(' ')[0] ?? 'N/A',
        accessorKey: 'node.date.local',
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: 'Transaction Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        id: 'transactionType',
        accessorFn: (row) => row?.node?.transactionType,
        header: 'Type',
        cell: (props) => (
          <Box textTransform="capitalize">
            {props?.cell?.row?.original?.node?.transactionType?.toLowerCase()?.replace(/_/g, ' ')}
          </Box>
        ),
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: allTransactionFilterMapping?.transaction?.filterMapping?.allTransaction?.txnType,
          },
        },
      },
      {
        header: 'Note',
        accessorFn: (row) => row?.node?.narration,
        cell: (props) => <Tooltip title={props?.row?.original?.node?.narration as string} />,
        meta: {
          width: '50%',
        },
      },
      {
        id: 'branchName',
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branchName,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: allTransactionFilterMapping?.transaction?.filterMapping?.allTransaction?.branchId,
          },
        },
      },

      {
        id: 'amount',
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
          width: '2%',
        },
        enableColumnFilter: true,
        filterFn: 'amount',
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
          router.push(`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${row?.node?.id}`)
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
