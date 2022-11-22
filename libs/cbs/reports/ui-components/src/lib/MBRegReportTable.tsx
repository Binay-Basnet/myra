import React from 'react';
import dayjs from 'dayjs';

import { EbankingReportResult } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';

interface MBRegReportTableProps {
  report: EbankingReportResult[];
}

export const MBRegReportTable = ({ report }: MBRegReportTableProps) => {
  const reports = report.map((r, index) => ({
    ...r,
    index: index + 1,
  }));

  const columns = React.useMemo<Column<EbankingReportResult & { index: number }>[]>(
    () => [
      {
        header: 'S.No.',
        accessorKey: 'index',
        meta: {
          width: '60px',
        },
      },
      {
        header: 'Member ID',
        accessorKey: 'memberId',
      },
      {
        header: 'Member Name',
        accessorFn: (row) => row?.memberName,
      },
      {
        header: 'Mobile No',
        accessorFn: (row) => row?.mobileNo,
      },
      {
        header: 'Registered Branch (Code)',
        accessorFn: (row) => row?.branchCode,
      },
      {
        header: 'Registered Date',
        accessorFn: (row) => row?.regDate,
        cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
      },
      {
        header: 'Expiry Date',
        accessorFn: (row) => row?.expDate,
        cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.status,
      },
      {
        header: 'Registered By',
        accessorFn: (row) => row?.registeredBy,
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
