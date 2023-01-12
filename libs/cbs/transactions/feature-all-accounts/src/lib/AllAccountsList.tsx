import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { useGetAllAccountsQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getRouterQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AllAccountsListProps {}

export const AllAccountsList = () => {
  const { data, isFetching } = useGetAllAccountsQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.allAccounts?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Account Id',
        accessorFn: (row) => row?.node?.ID,
      },
      {
        header: 'Member',
        accessorFn: (row) => row?.node?.member?.name?.local,
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.node?.accountName,
      },
      {
        header: 'Product',
        accessorFn: (row) => row?.node?.productName,
      },
      {
        header: 'Account Type',
        accessorFn: (row) => row?.node?.accountType,
      },
      {
        header: 'Account Open Date',
        accessorFn: (row) => localizedDate(row?.node?.accountOpenDate),
      },
    ],
    []
  );

  return (
    <Table
      data={rowData}
      getRowId={(row) => String(row?.node?.accountID)}
      isLoading={isFetching}
      columns={columns}
      pagination={{
        total: data?.allAccounts?.list?.totalCount ?? 'Many',
        pageInfo: data?.allAccounts?.list?.pageInfo,
      }}
      searchPlaceholder="Search all accounts"
    />
  );
};

export default AllAccountsList;
