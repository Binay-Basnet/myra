import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Flex } from '@chakra-ui/react';

import {
  Arrange,
  ObjState,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import {
  Column,
  DEFAULT_PAGE_SIZE,
  Table,
  TableListPageHeader,
} from '@coop/shared/ui';

export const UsersTable = () => {
  const router = useRouter();
  const { data, isFetching } = useGetMemberListQuery(
    router.query['before']
      ? {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          first: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
          after: router.query['before'] as string,
          column: 'ID',
          arrange: Arrange.Desc,
        }
      : {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
          after: (router.query['after'] ?? '') as string,
          column: 'ID',
          arrange: Arrange.Desc,
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [
    'memberListTableViewMemberProfile',
    'memberListTableEditMember',
    'memberListTableMakeInactive',
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'User',
        accessor: 'node.name.local',

        width: '60%',

        disableSortBy: false,
        disableFilters: false,

        Cell: ({ value }) => {
          return (
            <Flex alignItems="center" gap="2">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <span>{value}</span>
            </Flex>
          );
        },
      },

      {
        Header: 'Role',
        accessor: 'node.address.locality.local',
        width: '20%',

        Cell: ({ value, row }) => {
          return (
            <span>
              {value}, {row?.original?.node?.address?.locality?.local}
            </span>
          );
        },
      },
      {
        Header: 'Phone Number',
        accessor: 'node.contact',
        disableSortBy: false,
        disableFilters: false,

        Cell: ({ value }) => {
          return <span>{value}</span>;
        },
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: () => <PopoverComponent title={popoverTitle} />,
        disableFilters: true,
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
      <TableListPageHeader heading="Users List" tabItems={memberRows} />

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        sort={true}
        disableSortAll={true}
        filter={true}
        disableFilterAll={true}
        searchPlaceholder="Search Users"
        pagination={{
          total: 1200,
          endCursor: data?.members?.list.pageInfo?.startCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.endCursor ?? '',
        }}
      />
    </>
  );
};
