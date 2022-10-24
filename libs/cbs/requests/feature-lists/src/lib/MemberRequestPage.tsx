import React from 'react';

import { Column, Table } from '@coop/shared/table';
import { Box, PageHeader, TablePopover } from '@coop/shared/ui';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';

enum ApprovalStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Declined = 'Declined',
}

type TMemberRequestTable = {
  id: string;
  name: string;
  approvalStatus: ApprovalStatus;
  contactNumber: string;
  requestedDate: string;
};

export const MemberRequestPage = () => {
  const columns = React.useMemo<Column<TMemberRequestTable>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.id,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.name,
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.approvalStatus,
        cell: (props) => <ApprovalStatusItem status={props.row.original.approvalStatus} />,
      },
      {
        header: 'Contact Number',
        accessorFn: (row) => row?.contactNumber,
      },
      {
        header: 'Requested Date',
        accessorFn: (row) => row?.requestedDate,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover items={[{ title: 'View Details' }]} node={props.row.original} />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    []
  );

  return (
    <Box display="flex" flexDir="column">
      <Box position="sticky" top="110px" zIndex={3}>
        <PageHeader heading="Member Request" />
      </Box>

      <Table
        data={[
          {
            id: '12214',
            name: 'Ram Krishna',
            contactNumber: '9800000000',
            approvalStatus: ApprovalStatus.Approved,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            name: 'Ram Krishna',
            contactNumber: '9800000000',
            approvalStatus: ApprovalStatus.Declined,
            requestedDate: '2079-01-30',
          },

          {
            id: '12214',
            name: 'Ram Krishna',
            contactNumber: '9800000000',
            approvalStatus: ApprovalStatus.Pending,
            requestedDate: '2079-01-30',
          },
        ]}
        columns={columns}
      />
    </Box>
  );
};
