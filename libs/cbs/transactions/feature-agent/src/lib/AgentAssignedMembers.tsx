import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, DetailPageContentCard, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  useGetAgentAssignedMemberListDataQuery,
  useRemoveMemberAccountAgentMutation,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { AddMemberModal } from '../components';

export const AgentAssignedMembers = () => {
  const queryClient = useQueryClient();

  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState<boolean>(false);

  // const [isOverrideMemberAlertOpen, setIsOverrideMemberAlertOpen] =
  //   useState<boolean>(false);

  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const { mutateAsync: removeMemberAccount } = useRemoveMemberAccountAgentMutation();

  const {
    data,
    isFetching,
    refetch: refetchAssignedMembersList,
  } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: getPaginationQuery(),
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'agentId',
                comparator: 'EqualTo',
                value: id,
              },
            ],
          },
        ],
      },
      // filter: {
      //   objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
      // },
    },
    { enabled: !!id }
  );

  const rowData = useMemo(() => data?.agent?.assignedMemberList?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.node?.member?.name?.local,
        header: t['agentAssignedMembersName'],
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),

        meta: {
          width: '60%',
        },
      },
      {
        header: t['agentAssignedMembersAccount'],
        accessorFn: (row) => row?.node?.account?.id,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['agentAssignedMembersAssignedDate'],
        accessorFn: (row) => localizedDate(row?.node?.assignedDate),
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original?.node}
            items={[
              {
                title: 'Remove Account',
                onClick: (row) => {
                  asyncToast({
                    id: 'remove-agent-assigned member account',
                    msgs: { loading: 'Removing account', success: 'Account removed' },
                    promise: removeMemberAccount({
                      agentID: id as string,
                      accountId: row?.account?.id as string,
                    }),
                    onSuccess: () =>
                      queryClient.invalidateQueries(['getAgentAssignedMemberListData']),
                  });
                },
              },
            ]}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  const handleAddMemberModalOpen = () => {
    setIsAddMemberModalOpen(true);
  };

  const handleAddMemberModalClose = () => {
    setIsAddMemberModalOpen(false);
    // setIsOverrideMemberAlertOpen(true);
  };

  return (
    <>
      <DetailPageContentCard
        header={t['agentAssignedMembersAssignedMembers']}
        headerButtonLabel={t['agentAssignedMembersAddMember']}
        headerButtonHandler={handleAddMemberModalOpen}
      >
        <Table
          data={rowData}
          getRowId={(row) => String(row?.node?.id)}
          isLoading={isFetching}
          columns={columns}
          noDataTitle={t['agentAssignedMembersAssignedMembers']}
          pagination={{
            total: data?.agent?.assignedMemberList?.totalCount ?? 'Many',
            pageInfo: data?.agent?.assignedMemberList?.pageInfo,
          }}
        />
      </DetailPageContentCard>

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={handleAddMemberModalClose}
        refetchAssignedMembersList={refetchAssignedMembersList}
      />

      {/* <OverrideAlertModal
        isOpen={isOverrideMemberAlertOpen}
        onCancel={handleCancelOverrideMemberAlert}
        onConfirm={handleConfirmOverrideMemberAlert}
      /> */}
    </>
  );
};
