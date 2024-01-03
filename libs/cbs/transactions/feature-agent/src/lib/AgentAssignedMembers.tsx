import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, DetailPageContentCard, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useDeleteAgentMemberMutation, useListAgentMemberQuery } from '@coop/cbs/data-access';
import { Can } from '@coop/cbs/utils';
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

  const search = router?.query?.['search'];

  const { mutateAsync: removeMember } = useDeleteAgentMemberMutation();

  const {
    data,
    isFetching,
    refetch: refetchAssignedMembersList,
  } = useListAgentMemberQuery(
    {
      // id: id as string,
      pagination: {
        ...getPaginationQuery(),
        first: -1,
        // order: {
        //   arrange: Arrange.Desc,
        //   column: 'memberid',
        // },
      },
      filter: {
        query: search as string,
        orConditions: [
          { andConditions: [{ column: 'agentid', comparator: 'EqualTo', value: id as string }] },
        ],
      },
    },
    { enabled: !!id }
  );

  const rowData = useMemo(() => data?.agent?.listAgentMember?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Member Code',
        accessorFn: (row) => row?.node?.memberCode,
      },
      {
        accessorFn: (row) => row?.node?.memberName,
        header: 'Member Name',
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
          width: 'auto',
        },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original}
            items={[
              {
                title: 'Remove Member',
                onClick: (row) => {
                  asyncToast({
                    id: 'remove-agent-assigned-member',
                    msgs: { loading: 'Removing member', success: 'Member removed' },
                    promise: removeMember({
                      id: id as string,
                      memberId: row?.node?.id as string,
                    }),
                    onSuccess: () => queryClient.invalidateQueries(['listAgentMember']),
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
    []
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
        // headerButtonLabel={t['agentAssignedMembersAddMember']}
        // headerButtonHandler={handleAddMemberModalOpen}
        headerButtons={
          <Can I="CREATE" a="AGENT_ASSIGN_MEMBER">
            <Button variant="link" onClick={handleAddMemberModalOpen}>
              {t['agentAssignedMembersAddMember']}
            </Button>
          </Can>
        }
      >
        <Table
          // isStatic
          data={rowData}
          isLoading={isFetching}
          columns={columns}
          noDataTitle={t['agentAssignedMembersAssignedMembers']}
          pagination={{
            total: data?.agent?.listAgentMember?.totalCount ?? 'Many',
            pageInfo: data?.agent?.listAgentMember?.pageInfo,
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
