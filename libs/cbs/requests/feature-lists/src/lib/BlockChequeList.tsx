import React from 'react';

import { Column, Table } from '@coop/shared/table';
import { Box, PageHeader, TablePopover, Text } from '@coop/shared/ui';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';

enum ApprovalStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Declined = 'Declined',
}

type TMemberRequestTable = {
  id: string;
  requestBy: {
    name: string;
    id: string;
  };
  account: {
    name: string;
    id: string;
  };
  approvalStatus: ApprovalStatus;
  chequeNumber: string;
};

export const BlockChequeRequest = () => {
  const columns = React.useMemo<Column<TMemberRequestTable>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.id,
      },

      {
        header: 'Requested By',
        accessorFn: (row) => row?.requestBy,
        cell: (props) => (
          <Box display="flex" flexDir="column" gap="s4">
            <Text fontSize="r1" fontWeight={500} color="gray.800">
              {props.row?.original?.requestBy?.name}
            </Text>
            <Text fontSize="r1" color="gray.600">
              {props.row?.original?.requestBy?.id}
            </Text>
          </Box>
        ),
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.account,
        cell: (props) => (
          <Box display="flex" flexDir="column" gap="s4">
            <Text fontSize="r1" fontWeight={500} color="gray.800">
              {props.row?.original?.account?.name}
            </Text>
            <Text fontSize="r1" color="gray.600">
              {props.row?.original?.account?.id}
            </Text>
          </Box>
        ),
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
        header: 'Cheque Number',
        accessorFn: (row) => row?.chequeNumber,
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
        <PageHeader heading="Block Cheque Request" />
      </Box>

      <Table
        data={[
          {
            id: '12214',
            requestBy: {
              name: 'Ram Krishna',
              id: '234134940',
            },
            account: {
              name: 'Saving Account',
              id: '019384948494944',
            },
            approvalStatus: ApprovalStatus.Approved,
            chequeNumber: '34580449408',
          },

          {
            id: '12214',
            requestBy: {
              name: 'Ram Krishna',
              id: '234134940',
            },
            account: {
              name: 'Saving Account',
              id: '019384948494944',
            },
            approvalStatus: ApprovalStatus.Approved,
            chequeNumber: '34580449408',
          },
          {
            id: '12214',
            requestBy: {
              name: 'Ram Krishna',
              id: '234134940',
            },
            account: {
              name: 'Saving Account',
              id: '019384948494944',
            },
            approvalStatus: ApprovalStatus.Pending,
            chequeNumber: '34580449408',
          },
          {
            id: '12214',
            requestBy: {
              name: 'Ram Krishna',
              id: '234134940',
            },
            account: {
              name: 'Saving Account',
              id: '019384948494944',
            },
            approvalStatus: ApprovalStatus.Approved,
            chequeNumber: '34580449408',
          },
          {
            id: '12214',
            requestBy: {
              name: 'Ram Krishna',
              id: '234134940',
            },
            account: {
              name: 'Saving Account',
              id: '019384948494944',
            },
            approvalStatus: ApprovalStatus.Declined,
            chequeNumber: '34580449408',
          },
        ]}
        columns={columns}
      />
    </Box>
  );
};
