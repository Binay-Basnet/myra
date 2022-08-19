import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Arrange, useGetAllSavedReportsQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, PageHeader } from '@coop/shared/ui';

export const SavedReportList = () => {
  const router = useRouter();
  const { data: reportListData, isFetching } = useGetAllSavedReportsQuery({
    pagination: {
      after: '',
      first: 1000,
      order: { arrange: Arrange.Desc, column: 'ID' },
    },
  });

  const reportList = useMemo(
    () => reportListData?.report?.listReports.edges ?? [],
    [reportListData]
  );

  const columns = useMemo<Column<typeof reportList[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
        meta: {
          width: '100px',
        },
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.name,
        meta: {
          width: '80%',
        },
      },
      {
        header: 'Report Type',
        accessorFn: (row) => row?.node?.reportType,
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Saved By',
        accessorFn: (row) => row?.node?.savedBy,
        cell: ({ getValue }) => (
          <Box textTransform="capitalize">{getValue()}</Box>
        ),
      },
      {
        header: 'Last Modified Date',
        accessorFn: (row) => row?.node?.lastModifiedDate,
      },

      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <PopoverComponent
            items={[
              {
                title: 'View Report',
                onClick: () =>
                  router.push(
                    `/reports/cbs/share-report/edit?id=${props?.cell?.row?.original?.node?.id}`
                  ),
              },
            ]}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [router]
  );

  return (
    <>
      <PageHeader heading="Saved Reports" />
      <Table
        data={reportList}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: reportListData?.report.listReports.totalCount ?? 'Many',
          endCursor: reportListData?.report.listReports.pageInfo
            ?.endCursor as string,
          startCursor: reportListData?.report.listReports.pageInfo
            ?.startCursor as string,
        }}
      />
    </>
  );
};
