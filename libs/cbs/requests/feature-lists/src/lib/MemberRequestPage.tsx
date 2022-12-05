import React from 'react';

import { Box, PageHeader, TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { RequestStatus } from '@coop/cbs/data-access';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';

type TMemberRequestTable = {
  id: string;
  name: string;
  approvalStatus: RequestStatus;
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
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            name: 'Ram Krishna',
            contactNumber: '9800000000',
            approvalStatus: RequestStatus.Declined,
            requestedDate: '2079-01-30',
          },

          {
            id: '12214',
            name: 'Ram Krishna',
            contactNumber: '9800000000',
            approvalStatus: RequestStatus.Pending,
            requestedDate: '2079-01-30',
          },
        ]}
        columns={columns}
      />
    </Box>
  );
};
