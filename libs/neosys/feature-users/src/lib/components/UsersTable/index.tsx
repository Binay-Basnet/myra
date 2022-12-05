import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Flex } from '@chakra-ui/react';

import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, PageHeader, Table } from '@myra-ui';
import { getRouterQuery } from '@coop/shared/utils';

export const UsersTable = () => {
  const router = useRouter();
  const { data, isFetching } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [
    'memberListTableViewMemberProfile',
    'memberListTableEditMember',
    'memberListTableMakeInactive',
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: '1',
        header: 'User',
        accessorFn: (row) => row?.node?.name,

        cell: ({ getValue }) => (
          <Flex alignItems="center" gap="2">
            <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
            <span>{getValue() as string}</span>
          </Flex>
        ),
      },

      {
        id: '2',

        header: 'Role',
        accessorFn: (row) => row?.node?.address?.locality?.local,

        cell: ({ getValue, row }) => (
          <span>
            {getValue() as string}, {row?.original?.node?.address?.locality?.local}
          </span>
        ),
      },
      {
        id: '3',
        header: 'Phone Number',
        accessorFn: (row) => row?.node?.contact,

        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        id: '4',

        header: '',
        accessor: 'actions',
        cell: () => <PopoverComponent title={popoverTitle} />,
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
