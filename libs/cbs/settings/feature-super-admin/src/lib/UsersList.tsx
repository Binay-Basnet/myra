import { useMemo, useState } from 'react';

import { useGetSettingsUserListDataQuery } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

import { NewUserModal } from '../components';

// const memberTypeSlug = {
//   INDIVIDUAL: 'individual',
//   INSTITUTION: 'institution',
//   COOPERATIVE: 'coop',
//   COOPERATIVE_UNION: 'coop_union',
// };

export function UsersList() {
  const { t } = useTranslation();

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);

  // const router = useRouter();

  const { data: userListQueryData, isLoading: isFetching } =
    useGetSettingsUserListDataQuery(
      {
        paginate: getRouterQuery({ type: ['PAGINATION'] }),
      },
      { staleTime: 0 }
    );

  const rowData = useMemo(
    () => userListQueryData?.settings?.myraUser?.list?.edges ?? [],
    [userListQueryData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'User ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name,
        header: 'Name',
        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="s12">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
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
        header: 'Contact No',
        accessorFn: (row) => row?.node?.contactNo,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Role',
        accessorFn: (row) => row?.node?.role,
      },
      {
        header: 'Last Active Date',
        accessorFn: (row) => row?.node?.modifiedAt.split('T')[0] ?? 'N/A',
      },
      {
        header: t['memberListDateJoined'],
        accessorFn: (row) => row?.node?.createdAt.split('T')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: () => <PopoverComponent items={[]} />,
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
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
        heading={'Super Admin'}
        buttonLabel={'New User'}
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
        noDataTitle={'User'}
        pagination={{
          total:
            userListQueryData?.settings?.myraUser?.list?.totalCount ?? 'Many',
          pageInfo: userListQueryData?.settings?.myraUser?.list?.pageInfo,
        }}
        searchPlaceholder="Search Users"
      />

      <NewUserModal
        isOpen={isAddUserModalOpen}
        onClose={handleAddUserModalClose}
      />
    </>
  );
}

export default UsersList;
