import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Flex } from '@chakra-ui/react';
import format from 'date-fns/format';

import { PopoverComponent } from '@coop/myra/components';
import { ObjState, useGetMemberListQuery } from '@coop/shared/data-access';
import { Column, DEFAULT_PAGE_SIZE, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { TableListPageHeader } from '../TableListPageHeader';

export const MemberTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isFetching } = useGetMemberListQuery(
    router.query['before']
      ? {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,

          last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
          before: router.query['before'] as string,
        }
      : {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,

          first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
          after: (router.query['after'] ?? '') as string,
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'memberListTableViewMemberProfile',
    },
    {
      title: 'memberListTableEditMember',
      onClick: (memberId?: string) =>
        router.push(`/members/individual/edit/${memberId}`),
    },
    {
      title: 'memberListTableMakeInactive',
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: t['memberListTableMemberID'],
        accessor: 'node.id',
        maxWidth: 4,
        disableSortBy: false,
      },

      {
        Header: t['memberListTableName'],
        accessor: 'node.name.local',

        width: '60%',

        disableSortBy: false,
        disableFilters: false,

        Cell: ({ value, row }) => {
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
        Header: t['memberListTableAddress'],
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
        Header: t['memberListTablePhoneNo'],
        accessor: 'node.contact',

        width: '10%',
      },
      {
        Header: t['memberListDateJoined'],
        accessor: 'node.createdAt',
        disableSortBy: false,
        disableFilters: false,

        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: (cell) => (
          <PopoverComponent
            items={popoverTitle}
            memberId={cell?.row?.original?.node?.id}
          />
        ),
        disableFilters: true,
      },
    ],
    [t]
  );

  const memberRows = useMemo(
    () => [
      {
        title: 'memberNavActive',
        key: 'APPROVED',
      },
      {
        title: 'memberNavInactive',
        key: 'VALIDATED',
      },
      {
        title: 'memberNavDraft',
        key: 'DRAFT',
      },
    ],
    []
  );

  return (
    <>
      <TableListPageHeader
        heading={'memberLayoutMembers'}
        tabItems={memberRows}
      />

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        sort={true}
        disableSortAll={true}
        filter={true}
        disableFilterAll={true}
        pagination={{
          total: Number(data?.members?.list?.totalCount),
          endCursor: data?.members?.list.pageInfo?.endCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.startCursor ?? '',
        }}
      />
    </>
  );
};
