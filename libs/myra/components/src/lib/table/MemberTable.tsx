import { useMemo } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Avatar, Flex } from '@chakra-ui/react';
import {
  KymMemberListEdges,
  ObjState,
  useGetMemberListQuery,
} from '@saccos/myra/graphql';
import { Column, Table } from '@saccos/myra/ui';
import { PopoverComponent } from '@saccos/myra/components';

export const MemberTable = () => {
  const router = useRouter();
  const { data, isLoading } = useGetMemberListQuery({
    objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
  });

  const rowData = useMemo(() => data?.members?.list?.edges, [data]);

  const popoverTitle = [' View Member Profile', 'Edit Member', 'Make Inactive'];

  const columns: Column<KymMemberListEdges>[] = useMemo(
    () => [
      {
        Header: 'Member ID',
        accessor: 'node.id',
        maxWidth: 4,
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
        accessor: 'actions',
        Cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    []
  );

  return (
    <Table
      isLoading={isLoading}
      data={rowData ?? []}
      columns={columns}
      sort={true}
    />
  );
};
