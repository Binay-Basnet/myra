import React from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  MemberTransferState,
  RequestStatus,
  useGetMemberFilterMappingQuery,
  useGetMemberTransferListQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';

export const MemberTransferList = () => {
  const router = useRouter();
  const { data: filterMapping } = useGetMemberFilterMappingQuery();
  const { data, isFetching } = useGetMemberTransferListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });
  const memberTransferData = data?.members?.transfer?.list?.edges || [];

  const columns = React.useMemo<Column<typeof memberTransferData[0]>[]>(
    () => [
      {
        id: 'requestedDate',
        header: 'Requested Date',
        accessorFn: (props) => props?.node?.requestDate?.local || '-',
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        id: 'approvedDate',
        header: 'Approved Date',
        accessorFn: (props) => props?.node?.approvedDate?.local || '-',
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: 'Member Id',
        accessorKey: 'node.memberId',
      },
      {
        header: 'Member Name',
        accessorKey: 'node.memberName',
      },
      {
        id: 'previousbranchid',
        header: 'Current Service Center',
        accessorKey: 'node.prevBranchName',
        enableColumnFilter: true,
        meta: {
          filterMaps: { list: filterMapping?.members?.filterMapping?.serviceCenter || [] },
        },
      },
      {
        id: 'newbranchid',
        header: 'New Service Center',
        accessorKey: 'node.newBranchName',
        enableColumnFilter: true,
        meta: {
          filterMaps: { list: filterMapping?.members?.filterMapping?.serviceCenter || [] },
        },
      },
      {
        id: 'state',
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.state,
        enableColumnFilter: true,

        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.state as RequestStatus} />
        ),
        meta: {
          filterMaps: {
            list: [
              { label: 'Approved', value: MemberTransferState.Approved },
              { label: 'Applied', value: MemberTransferState.Applied },
              { label: 'Rejected', value: MemberTransferState.Rejected },
            ],
          },
        },
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
    [filterMapping?.members?.filterMapping?.serviceCenter, router]
  );

  return (
    <Box display="flex" flexDir="column">
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader
          heading="Member Transfer List"
          buttonTitle="New Member Transfer"
          onClick={() => router?.push(ROUTES?.CBS_MEMBER_TRANSFER)}
          button
        />
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
