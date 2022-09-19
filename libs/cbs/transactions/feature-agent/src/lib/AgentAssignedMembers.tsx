import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { useGetAgentAssignedMemberListDataQuery } from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, DetailPageContentCard, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

import { AddMemberModal } from '../components';

export const AgentAssignedMembers = () => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState<boolean>(false);

  // const [isOverrideMemberAlertOpen, setIsOverrideMemberAlertOpen] =
  //   useState<boolean>(false);

  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const {
    data,
    isFetching,
    refetch: refetchAssignedMembersList,
  } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        agentId: id as string,
      },
      // filter: {
      //   objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
      // },
    },
    { enabled: !!id }
  );

  const rowData = useMemo(() => data?.transaction?.assignedMemberList?.edges ?? [], [data]);

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
        accessorFn: (row) => row?.node?.assignedDate?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) => (
          <ActionPopoverComponent items={[]} id={props?.row?.original?.node?.id as string} />
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
            total: data?.transaction?.assignedMemberList?.totalCount ?? 'Many',
            pageInfo: data?.transaction?.assignedMemberList?.pageInfo,
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
