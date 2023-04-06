import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Avatar, Box, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  useAppSelector,
  useChangeUserStateMutation,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { featureCode, getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { NewUserModal } from '../components';

// const memberTypeSlug = {
//   INDIVIDUAL: 'individual',
//   INSTITUTION: 'institution',
//   COOPERATIVE: 'coop',
//   COOPERATIVE_UNION: 'coop_union',
// };
//
// const roles = {
//   [Roles.Agent]: 'Market Representative',
//   [Roles.BranchManager]: 'Service Center Manager',
//   [Roles.HeadTeller]: 'Head Teller',
//   [Roles.Teller]: 'Teller',
//   [Roles.Superadmin]: 'Super Admin',
// };

export const UsersList = () => {
  const queryClient = useQueryClient();

  const datePreference = useAppSelector((state) => state?.auth?.preference?.date);

  const { t } = useTranslation();

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { mutateAsync: changeUserState } = useChangeUserStateMutation();

  const {
    data: userListQueryData,
    isLoading: isFetching,
    refetch: refetchUserList,
  } = useGetSettingsUserListDataQuery(
    {
      paginate: getPaginationQuery(),
      filter: {
        query: searchTerm,
      },
    },
    { staleTime: 0, enabled: searchTerm !== 'undefined' }
  );

  const rowData = useMemo(
    () => userListQueryData?.settings?.myraUser?.list?.edges ?? [],
    [userListQueryData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'User ID',
        accessorFn: (row) => row?.node?.empCode,
      },
      {
        accessorFn: (row) => row?.node?.name,
        header: 'Name',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props.row.original.node?.profilePicUrl ?? ''}
            />
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
      },
      // {
      //   header: 'Service Center',
      //   accessorFn: (row) => row?.node?.branch?.name,
      // },
      {
        header: 'Contact No',
        accessorFn: (row) => row?.node?.contactNo,
      },
      // {
      //   header: 'Role',
      //   accessorFn: (row) => (row?.node?.role ? roles.AGENT : ''),
      // },
      {
        header: 'Last Active Date',
        cell: (props) => localizedDate(props?.row?.original?.node?.lastActiveDate),
      },
      {
        header: t['memberListDateJoined'],
        cell: (props) => localizedDate(props?.row?.original?.node?.createdAt),
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',

        cell: (props) => (
          <TablePopover
            items={[
              {
                title: 'Edit',
                onClick: () => {
                  router.push(`${ROUTES.SETTINGS_USERS_EDIT}?id=${props?.row?.original?.node?.id}`);
                },
              },
              {
                title:
                  props?.row?.original?.node?.objState === 'APPROVED'
                    ? 'Make Inactive'
                    : 'Make Active',
                onClick: () => {
                  asyncToast({
                    id: 'user-change-state',
                    msgs: {
                      loading: 'Updating user state',
                      success: 'User state updated',
                    },
                    promise: changeUserState({
                      userID: props?.row?.original?.node?.id as string,
                      state:
                        props?.row?.original?.node?.objState === 'APPROVED'
                          ? 'INACTIVE'
                          : 'APPROVED',
                    }),
                    onSuccess: () => queryClient.invalidateQueries(['getSettingsUserListData']),
                  });
                },
              },
              {
                title: 'Details',

                onClick: (row) => router.push(`${ROUTES.SETTINGS_USERS_DETAILS}?id=${row['id']}`),
              },
            ]}
            node={props?.row?.original?.node}
          />
        ),

        meta: {
          width: '60px',
        },
      },
    ],
    [t, searchTerm, datePreference]
  );

  const handleAddUserModalOpen = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserModalClose = () => {
    setIsAddUserModalOpen(false);
  };

  return (
    <>
      <SettingsPageHeader
        heading={`Users - ${featureCode.userList}`}
        buttonLabel="New User"
        buttonHandler={handleAddUserModalOpen}
        // buttonHandler={() =>
        //   newId
        //     .mutateAsync({ idType: Id_Type.Branch })
        //     .then((res) =>
        //       router.push(`/settings/general/service-center/add/${res?.newId}`)
        //     )
        // }
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        noDataTitle="User"
        rowOnClick={(row) => {
          router.push(`${ROUTES.SETTINGS_USERS_DETAILS}?id=${row?.node?.id}`);
        }}
        pagination={{
          total: userListQueryData?.settings?.myraUser?.list?.totalCount ?? 'Many',
          pageInfo: userListQueryData?.settings?.myraUser?.list?.pageInfo,
        }}
        searchPlaceholder="Search Users"
      />

      {isAddUserModalOpen && (
        <NewUserModal
          isOpen={isAddUserModalOpen}
          onClose={handleAddUserModalClose}
          refetchUserList={refetchUserList}
        />
      )}
    </>
  );
};

export default UsersList;
