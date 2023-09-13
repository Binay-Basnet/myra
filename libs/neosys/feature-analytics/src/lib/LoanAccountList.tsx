import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetLoanAccountCounterQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const LoanAccountList = () => {
  const { data, isFetching } = useGetLoanAccountCounterQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.loanAccountCounter?.listLoanAccountCounter?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Created at',
        accessorFn: (row) => row?.node?.createdAt,
      },
      {
        header: 'Approved Account',
        accessorFn: (row) => row?.node?.approvedAccount,
      },
      {
        header: 'Disbursed Account',
        accessorFn: (row) => row?.node?.disbursedAccount,
      },
      {
        header: 'Canceled Account',
        accessorFn: (row) => row?.node?.canceledAccount,
      },
      {
        header: 'Slug',
        accessorFn: (row) => row?.node?.slug,
      },
      {
        header: 'Query Id',
        accessorFn: (row) => row?.node?.queryID,
      },
      {
        header: 'Created at',
        accessorFn: (row) => row?.node?.createdAt,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Loan Accounts" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.loanAccountCounter?.listLoanAccountCounter
            ?.totalCount as number,
          pageInfo: data?.neosys?.thread?.loanAccountCounter?.listLoanAccountCounter?.pageInfo,
        }}
      />
    </>
  );
};

export default LoanAccountList;
