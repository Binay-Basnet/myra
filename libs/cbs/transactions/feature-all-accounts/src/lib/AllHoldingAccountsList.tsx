import { useMemo } from 'react';

import { Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetAllAccountsFilterMappingQuery, useGetAllAccountsQuery } from '@coop/cbs/data-access';
import { getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AllHoldingAccountsListProps {}

export const AllHoldingAccountsList = () => {
  const { data, isFetching } = useGetAllAccountsQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery(),
    isHoldings: true,
  });

  const { data: accountsFilterMapping, isLoading } = useGetAllAccountsFilterMappingQuery();

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
        id: 'accountType',
        header: 'Account Type',
        accessorFn: (row) => row?.node?.accountType,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: accountsFilterMapping?.allAccounts?.filterMapping?.accountType,
          },
        },
      },
    ],
    [isLoading]
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
    />
  );
};

export default AllHoldingAccountsList;
