import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetAllAccountsQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AllAccountsListProps {}

export const AllAccountsList = () => {
  const router = useRouter();

  const { data, isFetching } = useGetAllAccountsQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.allAccounts?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Account Open Date',
        accessorFn: (row) => localizedDate(row?.node?.accountOpenDate),
        cell: (props) => localizedDate(props?.row?.original?.node?.accountOpenDate),
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
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
        cell: (props) => <Tooltip title={props?.row?.original?.node?.accountName as string} />,
      },
      {
        id: 'productName',
        header: 'Product',
        accessorFn: (row) => row?.node?.productName,
        enableColumnFilter: true,
      },
      {
        id: 'accountType',
        header: 'Account Type',
        accessorFn: (row) => row?.node?.accountType,
        enableColumnFilter: true,
      },
    ],
    []
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
      rowOnClick={(row) => {
        router.push(
          `${ROUTES.CBS_TRANS_ALL_ACCOUNTS_DETAILS}?id=${row?.node?.ID}&type=${row?.node?.accountType}`
        );
      }}
    />
  );
};

export default AllAccountsList;
