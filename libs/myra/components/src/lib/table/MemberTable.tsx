import { useMemo } from 'react';
import { Avatar, Flex } from '@chakra-ui/react';
import { PopoverComponent } from '@coop/myra/components';
import { ObjState, useGetMemberListQuery } from '@coop/myra/graphql';
import { Column, DEFAULT_PAGE_SIZE, Table } from '@coop/myra/ui';
import format from 'date-fns/format';
import { useRouter } from 'next/router';

import { TableListPageHeader } from '../TableListPageHeader';

export const MemberTable = () => {
  const router = useRouter();
  const { data, isLoading } = useGetMemberListQuery({
    objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
    last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
    after: router.query['after'] as string,
    before: router.query['before'] as string,
  });

  console.log(isLoading);

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [' View Member Profile', 'Edit Member', 'Make Inactive'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'Member ID',
        accessor: 'node.id',
        maxWidth: 4,
        disableSortBy: false,
      },

      {
        Header: 'Name',
        accessor: 'node.personalInformation.name.firstName',
        width: '80%',

        Cell: ({ value, row }) => {
          return (
            <Flex alignItems="center" gap="2">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <span>
                {value}{' '}
                {row?.original?.node?.personalInformation?.name?.lastName}
              </span>
            </Flex>
          );
        },
      },

      {
        Header: 'Address',
        accessor: 'node.address.permanent.district',
        maxWidth: 48,

        Cell: ({ value, row }) => {
          return (
            <span>
              {value}, {row?.original?.node?.address?.permanent?.state}
            </span>
          );
        },
      },
      {
        Header: 'Phone No.',
        accessor: 'node.contact.mobile',
      },
      {
        Header: 'Date Joined',
        accessor: 'node.createdAt',
        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
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
      <TableListPageHeader heading={'Members'} tabItems={memberRows} />

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        sort={true}
        disableSortAll={true}
        filter={true}
        pagination={{
          total: 1200,
          endCursor: data?.members?.list.pageInfo?.startCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.endCursor ?? '',
        }}
      />
    </>
  );
};
