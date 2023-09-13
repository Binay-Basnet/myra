import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetSavingAccountCounterQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const SavingAccountList = () => {
  const { data, isFetching } = useGetSavingAccountCounterQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.savingAccountCounter?.listSavingAccountCounter?.edges ?? [],
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
        header: 'Active Account',
        accessorFn: (row) => row?.node?.activeAccount,
      },
      {
        header: 'Inactive Account',
        accessorFn: (row) => row?.node?.inactiveAccount,
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
      <PageHeader heading="Saving Accounts" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.savingAccountCounter?.listSavingAccountCounter
            ?.totalCount as number,
          pageInfo: data?.neosys?.thread?.savingAccountCounter?.listSavingAccountCounter?.pageInfo,
        }}
      />
    </>
  );
};

export default SavingAccountList;
