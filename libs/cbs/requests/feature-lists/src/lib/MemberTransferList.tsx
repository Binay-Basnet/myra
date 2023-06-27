import React from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { RequestStatus, useGetMemberTransferListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';

export const MemberTransferList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetMemberTransferListQuery({
    pagination: getPaginationQuery(),
  });
  const memberTransferData = data?.members?.transfer?.list?.edges || [];

  const columns = React.useMemo<Column<typeof memberTransferData[0]>[]>(
    () => [
      {
        header: 'Member Id',
        accessorKey: 'node.memberId',
      },
      {
        header: 'Member Name',
        accessorKey: 'node.memberName',
      },
      {
        header: 'Current Service Center',
        accessorKey: 'node.prevBranchName',
      },
      {
        header: 'New Service Center',
        accessorKey: 'node.newBranchName',
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.state,
        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.state as RequestStatus} />
        ),
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            items={[
              {
                title: 'View Details',
                onClick: (row) =>
                  router.push(
                    `${ROUTES?.CBS_MEMBER_TRANSFER}?requestId=${row?.node?.id}&&type=details`
                  ),
              },
              {
                title: 'Approve Request',
                onClick: (row) =>
                  router.push(
                    `${ROUTES?.CBS_MEMBER_TRANSFER}?requestId=${row?.node?.id}&&type=approve`
                  ),
              },
            ]}
            node={props.row.original}
          />
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
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading="Member Transfer List" />
      </Box>

      <Table
        isLoading={isFetching}
        data={memberTransferData}
        columns={columns}
        pagination={{
          total: data?.members?.transfer?.list?.totalCount ?? 'Many',
          pageInfo: data?.members?.transfer?.list?.pageInfo,
        }}
        menu="REQUESTS"
      />
    </Box>
  );
};
