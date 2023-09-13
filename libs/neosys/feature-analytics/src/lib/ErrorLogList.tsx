import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGeterrorLogListQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const ErrorLogList = () => {
  const { data, isFetching } = useGeterrorLogListQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(() => data?.neosys?.thread?.errorLog?.listErrorLog?.edges ?? [], [data]);

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
        header: 'Saccos Name',
        accessorFn: (row) => row?.node?.saccosName,
      },
      {
        header: 'Log Message',
        accessorFn: (row) => row?.node?.logMessage,
      },
      {
        header: 'Query Id',
        accessorFn: (row) => row?.node?.queryID,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Error Log list" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.errorLog?.listErrorLog?.totalCount as number,
          pageInfo: data?.neosys?.thread?.errorLog?.listErrorLog?.pageInfo,
        }}
      />
    </>
  );
};

export default ErrorLogList;
