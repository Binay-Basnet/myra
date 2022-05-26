import { Column, Table } from '../../ui/src';
import { useMemo } from 'react';
import {
  Gender,
  useMembersQuery,
} from '../../../../apps/myra/generated/graphql';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: Gender;
  title?: string | null;
  dateOfBirth?: string | null;
};

export const MemberTable = () => {
  const { data, isLoading } = useMembersQuery();

  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Member #',
        accessor: 'id',
        maxWidth: 4,
      },

      {
        Header: 'First Name',
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
        Header: 'Title',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Gender',
        accessor: 'gender',
        maxWidth: 2,
        disableSortBy: true,
      },
      {
        Header: 'Date Of Birth',
        accessor: 'dateOfBirth',
        maxWidth: 2,
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
