import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetUtilityClientBalanceListQuery } from '@coop/neosys-admin/data-access';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

export const UtilityClientBalanceList = () => {
  const { data, isFetching } = useGetUtilityClientBalanceListQuery({
    paginate: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.utility?.listSaccosAvailableAmount?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'SACCOS',
        accessorFn: (row) => row?.node?.saccossName,
        meta: {
          width: 'auto',
        },
      },
      {
        header: 'Available Balance',
        accessorFn: (row) => amountConverter(row?.node?.Amount || 0),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Utility Client Balance" />

      <Table isLoading={isFetching} data={rowData} columns={columns} />
    </>
  );
};
