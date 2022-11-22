import React from 'react';

import { ServiceCenter } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';

interface InterestTaxReportTableProps {
  report: ServiceCenter[];
}

export const SCReportTable = ({ report }: InterestTaxReportTableProps) => {
  const reports = report.map((interest, index) => ({
    ...interest,
    index: index + 1,
  }));

  const columns = React.useMemo<Column<ServiceCenter & { index: number }>[]>(
    () => [
      {
        id: '1',
        header: '',
        columns: [
          {
            header: 'S.No.',
            accessorKey: 'index',
            meta: {
              width: '60px',
            },
          },
          {
            header: 'Service Center Name',
            accessorFn: (row) => row?.name,
          },
          {
            header: 'Service Center Code',
            accessorFn: (row) => row?.serviceCenterCode,
          },
          {
            header: 'Service Center Contact No.',
            accessorFn: (row) => row?.contactNumber,
          },
          {
            header: 'Email Address',
            accessorFn: (row) => row?.email,
          },
        ],
      },

      {
        header: 'Service Center Address',
        columns: [
          {
            header: 'Province',
            accessorFn: (row) => row?.address?.state?.local,
          },
          {
            header: 'District',
            accessorFn: (row) => row?.address?.district?.local,
          },
          {
            header: 'Local Government',
            accessorFn: (row) => row?.address?.localGovernment?.local,
          },
          {
            header: 'Ward',
            accessorFn: (row) => row?.address?.wardNo,
          },
          {
            header: 'Locality',
            accessorFn: (row) => row?.address?.locality?.local,
          },
        ],
      },
      {
        id: '2',
        header: '',
        columns: [
          {
            header: 'Contact Person Name',
            accessorKey: 'managerName',
          },
          {
            header: 'Contact Person Phone',
            accessorKey: 'managerContact',
          },
          {
            header: 'Is Extension Counter',
            accessorKey: 'isExtensionCounter',
          },
          {
            header: 'Service Center Opening Date',
            accessorKey: 'estDate',
          },
          {
            header: 'Service Center Status',
            accessorKey: 'branchStatus',
          },
          {
            header: 'Remarks',
            accessorKey: 'remarks',
          },
        ],
      },
    ],
    []
  );

  return (
    <Box p="s32">
      <Table variant="report" size="report" isStatic data={reports} columns={columns} />
    </Box>
  );
};
