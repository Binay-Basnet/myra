import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, DetailPageContentCard, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

import { AddMemberModal, OverrideAlertModal } from '../components';

export const AgentAssignedMembers = () => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] =
    useState<boolean>(false);

  const [isOverrideMemberAlertOpen, setIsOverrideMemberAlertOpen] =
    useState<boolean>(false);

  const router = useRouter();

  const { t } = useTranslation();

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['memberListTableName'],
        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="s12">
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue()}
              </Text>
            </Box>
          );
        },

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Assigned Date',
        accessorFn: (row) => row?.node?.dateJoined?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) => {
          return (
            <ActionPopoverComponent
              items={[]}
              id={props?.row?.original?.node?.id as string}
            />
          );
        },
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
    setIsOverrideMemberAlertOpen(true);
  };

  const handleCancelOverrideMemberAlert = () => {
    setIsOverrideMemberAlertOpen(false);
  };

  const handleConfirmOverrideMemberAlert = () => {
    setIsOverrideMemberAlertOpen(false);
  };

  return (
    <>
      <DetailPageContentCard
        header="Assigned Members"
        headerButtonLabel="Add Members"
        headerButtonHandler={handleAddMemberModalOpen}
      >
        <Table
          data={rowData}
          getRowId={(row) => String(row?.node?.id)}
          isLoading={isFetching}
          columns={columns}
          noDataTitle={t['member']}
          pagination={{
            total: data?.members?.list?.totalCount ?? 'Many',
            pageInfo: data?.members.list.pageInfo,
          }}
        />
      </DetailPageContentCard>

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={handleAddMemberModalClose}
      />

      <OverrideAlertModal
        isOpen={isOverrideMemberAlertOpen}
        onCancel={handleCancelOverrideMemberAlert}
        onConfirm={handleConfirmOverrideMemberAlert}
      />
    </>
  );
};
