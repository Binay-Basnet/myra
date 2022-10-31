import React from 'react';

import { RequestStatus } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box, PageHeader, TablePopover } from '@coop/shared/ui';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';

type TMemberRequestTable = {
  id: string;
  sourceBranch: string;
  receiverBranch: string;

  approvalStatus: RequestStatus;
  amount: string;
  requestedDate: string;
};

export const BranchTransferRequstList = () => {
  const columns = React.useMemo<Column<TMemberRequestTable>[]>(
    () => [
      {
        header: 'Request ID',
        accessorFn: (row) => row?.id,
      },

      {
        header: 'Source Teller',
        accessorFn: (row) => row?.sourceBranch,
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Receiver Teller',
        accessorFn: (row) => row?.receiverBranch,

        meta: {
          width: '50%',
        },
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.approvalStatus,
        cell: (props) => <ApprovalStatusItem status={props.row.original.approvalStatus} />,
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.amount,
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
        <PageHeader heading="Branch Transfer Request" />
      </Box>

      <Table
        data={[
          {
            id: '12214',
            sourceBranch: 'Lalitpur',
            receiverBranch: 'Kathmandu',
            amount: '24,000',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },

          {
            id: '12214',
            sourceBranch: 'Lalitpur',
            receiverBranch: 'Kathmandu',
            amount: '24,000',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            sourceBranch: 'Lalitpur',
            receiverBranch: 'Kathmandu',
            amount: '24,000',
            approvalStatus: RequestStatus.Declined,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            sourceBranch: 'Lalitpur',
            receiverBranch: 'Kathmandu',
            amount: '24,000',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            sourceBranch: 'Lalitpur',
            receiverBranch: 'Kathmandu',
            amount: '24,000',
            approvalStatus: RequestStatus.Pending,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            sourceBranch: 'Lalitpur',
            receiverBranch: 'Kathmandu',
            amount: '24,000',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },
        ]}
        columns={columns}
      />
    </Box>
  );
};
