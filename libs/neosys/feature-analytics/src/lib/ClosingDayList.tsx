import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetClosingDayListQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const ClosingDayList = () => {
  const { data, isFetching } = useGetClosingDayListQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.closingDay?.listClosingDay?.edges ?? [],
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
        header: 'Transaction Date',
        accessorFn: (row) => row?.node?.transactionDate?.local,
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
        header: 'Query Date',
        accessorFn: (row) => row?.node?.queryDate?.local,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Closing day list" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.closingDay?.listClosingDay?.totalCount as number,
          pageInfo: data?.neosys?.thread?.closingDay?.listClosingDay?.pageInfo,
        }}
      />
    </>
  );
};

export default ClosingDayList;
