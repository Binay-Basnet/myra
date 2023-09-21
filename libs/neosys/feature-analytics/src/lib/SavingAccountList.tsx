import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllSavingAccountCounterQuery } from '@coop/neosys-admin/data-access';

export const SavingAccountList = () => {
  const { data, isFetching } = useGetAllSavingAccountCounterQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.savingAccountCounter?.fetchSavingAccountCounter?.records ?? [],
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
        header: 'Active Account',
        accessorFn: (row) => row?.activeAccount,
      },
      {
        header: 'Inactive Account',
        accessorFn: (row) => row?.inactiveAccount,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Saving Accounts" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default SavingAccountList;
