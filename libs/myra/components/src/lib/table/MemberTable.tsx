import { useMemo } from 'react';
import { Avatar, Flex } from '@chakra-ui/react';
import { PopoverComponent } from '@coop/myra/components';
import { ObjState, useGetMemberListQuery } from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';
import moment from 'moment';
import { useRouter } from 'next/router';

import { TableListPageHeader } from '../TableListPageHeader';
import { TableSearch } from '../TableSearch';

export const MemberTable = () => {
  const router = useRouter();
  const { data, isFetching } = useGetMemberListQuery({
    objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
  });

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
          return <span>{moment(value).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: () => <PopoverComponent title={popoverTitle} />,
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
      <TableSearch />

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        sort={true}
        disableSortAll={true}
        filter={true}
      />
    </>
  );
};
