import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { Filter_Mode, useGetAllAccountsQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getRouterQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AllAccountsListProps {}

export const AllAccountsList = () => {
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetAllAccountsQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      id: searchTerm,
      loanAccountName: searchTerm,
      loanProductName: searchTerm,
      savingAccountName: searchTerm,
      savingProductName: searchTerm,
      loanMemberName: searchTerm,
      savingMemberName: searchTerm,
      filterMode: Filter_Mode.Or,
    },
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
        cell: (props) => <Tooltip title={props?.row?.original?.node?.accountName as string} />,
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
