import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { useLoanProvisionListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

export const LoanProvisionList = () => {
  const router = useRouter();

  const { data, isLoading } = useLoanProvisionListQuery({
    paginate: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.loanAccount?.loanProvisionList?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Provision Date',
        accessorFn: (row) => localizedDate(row?.node?.date),
        enableSorting: true,
        meta: { orderId: 'id' },
      },
      {
        header: 'Provision ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Conditions',
        accessorFn: (row) => row?.node?.conditions,
        meta: {
          width: '40%',
        },
      },
      {
        header: 'Provision Count',
        accessorFn: (row) => row?.node?.provisionCount,
      },
      {
        header: 'Amount',
        accessorFn: (row) => amountConverter(row?.node?.amount || 0),
        meta: {
          isNumeric: true,
        },
      },
    ],
    [router]
  );

  return (
    <>
      <PageHeader heading="Loan Loss Provision List" />

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.loanAccount?.loanProvisionList?.totalCount ?? 'Many',
          pageInfo: data?.loanAccount?.loanProvisionList?.pageInfo,
        }}
      />
    </>
  );
};
