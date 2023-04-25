import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetAllAccountsQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AllHoldingAccountsListProps {}

export const AllHoldingAccountsList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetAllAccountsQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery(),
    isHoldings: true,
  });

  const rowData = useMemo(() => data?.allAccounts?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Account Id',
        accessorFn: (row) => row?.node?.ID,
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.node?.accountName,
        cell: (props) => <Tooltip title={props?.row?.original?.node?.accountName as string} />,
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.serviceCenter,
      },
      {
        header: 'Ledger Balance',
        accessorFn: (row) => row?.node?.ledgerBalance,
        cell: (props) => amountConverter(props?.row?.original?.node?.ledgerBalance as string),
      },
    ],
    [isFetching]
  );

  return (
    <Table
      data={rowData}
      getRowId={(row) => String(row?.node?.ID)}
      isLoading={isFetching}
      columns={columns}
      pagination={{
        total: data?.allAccounts?.list?.totalCount ?? 'Many',
        pageInfo: data?.allAccounts?.list?.pageInfo,
      }}
      searchPlaceholder="Search all accounts"
      rowOnClick={(row) =>
        router.push(`${ROUTES?.CBS_TRANS_ALL_HOLDING_ACCOUNTS_DETAILS}?id=${row?.node?.ledgerId}`)
      }
    />
  );
};

export default AllHoldingAccountsList;
