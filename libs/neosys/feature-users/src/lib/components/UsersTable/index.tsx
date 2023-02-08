import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Flex } from '@chakra-ui/react';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetUserListQuery } from '@coop/neosys-admin/data-access';
import { getRouterQuery } from '@coop/shared/utils';

export const UsersTable = () => {
  const router = useRouter();
  const { data, isFetching } = useGetUserListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.neosys?.user?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: '1',
        header: 'User',
        accessorFn: (row) => row?.node?.username,

        cell: ({ getValue }) => (
          <Flex alignItems="center" gap="2">
            <Avatar name={getValue() as string} size="sm" />
            <span>{getValue() as string}</span>
          </Flex>
        ),
      },

      {
        id: '2',

        header: 'Role',
        accessorFn: (row) => row?.node?.role,
        cell: ({ getValue }) => <span>{(getValue() as string) || '-'}</span>,
      },
      {
        id: '3',
        header: 'Phone Number',
        accessorFn: (row) => row?.node?.contactNo,

        cell: ({ getValue }) => <span>{(getValue() as string) || '-'}</span>,
      },
      {
        id: '4',

        header: '',
        accessor: 'actions',
        cell: (cell) => (
          <TablePopover
            node={cell.row.original?.node}
            items={[
              {
                title: 'Edit User',
                onClick: (node) => {
                  router.push(`/users/edit/${node?.id}`);
                },
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  const memberRows = useMemo(
    () => [
      {
        title: 'neoClientTableActive',
        key: 'APPROVED',
      },
      // {
      //   title: 'neoClientTableDraft',
      //   key: 'VALIDATED',
      // },
      {
        title: 'neoClientTableInactive',
        key: 'DRAFT',
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Users List" tabItems={memberRows} />

      <Table isLoading={isFetching} data={rowData} columns={columns} />
    </>
  );
};
