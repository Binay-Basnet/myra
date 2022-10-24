import React from 'react';

import { RequestStatus } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, TablePopover, Text } from '@coop/shared/ui';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';

type TMemberRequestTable = {
  id: string;
  sourceTeller: {
    img?: string;
    name: string;
  };
  receiverTeller: {
    img?: string;
    name: string;
  };
  amount?: string;
  approvalStatus: RequestStatus;
  requestedDate: string;
};

export const TellerTransferList = () => {
  const columns = React.useMemo<Column<TMemberRequestTable>[]>(
    () => [
      {
        header: 'Request ID',
        accessorFn: (row) => row?.id,
      },

      {
        header: 'Source Teller',
        accessorFn: (row) => row?.sourceTeller,
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s8">
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            />
            <Text fontSize="r1" color="gray.900">
              {props.row?.original?.sourceTeller?.name}
            </Text>
          </Box>
        ),
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Receiver Teller',
        accessorFn: (row) => row?.receiverTeller,
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s8">
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            />
            <Text fontSize="r1" color="gray.900">
              {props.row?.original?.sourceTeller?.name}
            </Text>
          </Box>
        ),
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.amount,
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.approvalStatus,
        cell: (props) => <ApprovalStatusItem status={props.row.original.approvalStatus} />,
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
        <PageHeader heading="Teller Transfer" />
      </Box>

      <Table
        data={[
          {
            id: '12214',
            sourceTeller: {
              name: 'Ram Krishna',
            },
            receiverTeller: {
              name: 'Sikha Poudel',
            },
            amount: '45,000.00',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },

          {
            id: '12214',
            sourceTeller: {
              name: 'Ram Krishna',
            },
            receiverTeller: {
              name: 'Sikha Poudel',
            },
            amount: '45,000.00',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            sourceTeller: {
              name: 'Ram Krishna',
            },
            receiverTeller: {
              name: 'Sikha Poudel',
            },
            amount: '45,000.00',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },
          {
            id: '12214',
            sourceTeller: {
              name: 'Ram Krishna',
            },
            receiverTeller: {
              name: 'Sikha Poudel',
            },
            amount: '45,000.00',
            approvalStatus: RequestStatus.Approved,
            requestedDate: '2079-01-30',
          },
        ]}
        columns={columns}
      />
    </Box>
  );
};
