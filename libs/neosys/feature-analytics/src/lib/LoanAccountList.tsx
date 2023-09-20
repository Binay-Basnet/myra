import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllLoanAccountCounterQuery } from '@coop/neosys-admin/data-access';

export const LoanAccountList = () => {
  const { data, isFetching } = useGetAllLoanAccountCounterQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.loanAccountCounter?.fetchLoanAccountCounter?.records ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Query Date',
        accessorFn: (row) => row?.queryDate?.local,
      },
      {
        header: 'Slug',
        accessorFn: (row) => row?.slug,
      },

      {
        header: 'Approved Account',
        accessorFn: (row) => row?.approvedAccount,
      },
      {
        header: 'Disbursed Account',
        accessorFn: (row) => row?.disbursedAccount,
      },
      {
        header: 'Canceled Account',
        accessorFn: (row) => row?.canceledAccount,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Loan Accounts" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default LoanAccountList;
