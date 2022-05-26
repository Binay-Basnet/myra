import { Column, Table } from '../../ui/src';
import { useMemo } from 'react';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import {
  Gender,
  useMembersQuery,
} from '../../../../apps/myra/generated/graphql';

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: Gender;
  title?: string | null;
  dateOfBirth?: string | null;
};

export const ShareTable = () => {
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Date Joined',
        accessor: 'id',
        maxWidth: 4,
      },

      {
        Header: 'Type',
        accessor: 'middleName',
        width: '2%',
        maxWidth: 12,
      },

      {
        Header: 'Member Id',
        accessor: 'lastName',
        maxWidth: 4,
      },

      {
        Header: 'Name',
        accessor: 'firstName',
        width: '80%',

        Cell: ({ value }) => (
          <Flex alignItems="center" gap="2">
            <Avatar
              name="Dan Abrahmov"
              size="sm"
              src="https://bit.ly/dan-abramov"
            />
            <span>{value}</span>
          </Flex>
        ),
      },
      {
        Header: 'Share Count',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Share Value',
        accessor: 'gender',
        maxWidth: 2,
        disableSortBy: true,
      },

      {
        accessor: 'actions',
        Cell: () => (
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<BsThreeDots />}
          />
        ),
      },
    ],
    []
  );

  const { data, isLoading } = useMembersQuery();

  const rowData = useMemo(() => data && data?.members?.list, [data]);

  return (
    <Table
      isLoading={isLoading}
      data={rowData?.slice(0, 10) ?? []}
      columns={columns}
      sort={true}
    />
  );
};
