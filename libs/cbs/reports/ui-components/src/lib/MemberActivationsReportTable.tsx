import React from 'react';
import dayjs from 'dayjs';

import { ActiveInactiveMemberStatement } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';

interface MemberActivationsReportTableProps {
  report: ActiveInactiveMemberStatement[];
}

export const MemberActivationsReportTable = ({ report }: MemberActivationsReportTableProps) => {
  const reports = report.map((r, index) => ({
    ...r,
    index: index + 1,
  }));

  const columns = React.useMemo<Column<ActiveInactiveMemberStatement & { index: number }>[]>(
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
        header: 'District',
        accessorFn: (row) => row?.district,
      },
      {
        header: 'Ward No',
        accessorFn: (row) => row?.wardNo,
      },
      {
        header: 'Address',
        accessorFn: (row) => row?.address,
      },
      {
        header: 'DOB',
        accessorFn: (row) => row?.dob,
        cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
      },
      {
        header: 'Age',
        accessorFn: (row) => row?.age,
      },
      {
        header: 'Contact No.',
        accessorFn: (row) => row?.gender,
      },
      {
        header: 'PAN No.',
        accessorFn: (row) => row?.pan,
      },
      {
        header: 'Occupation',
        accessorFn: (row) => row?.occupation,
      },
      {
        header: 'Member Registration Date',
        accessorFn: (row) => row?.memberRegistrationDate,
        cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.status,
        cell: (props) => (props.getValue() ? 'Active' : 'Inactive'),
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
