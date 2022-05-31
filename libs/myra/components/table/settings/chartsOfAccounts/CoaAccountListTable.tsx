import { Column, Table } from '../../../../ui/src';
import { useMemo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import {
  Gender,
  useMembersQuery,
} from '../../../../../../apps/myra/generated/graphql';

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: Gender;
  title?: string | null;
  dateOfBirth?: string | null;
};

export const CoaAccountListTable = () => {
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Account Code',
        accessor: 'id',
        maxWidth: 4,
      },
      {
        Header: 'AccountName',
        accessor: 'firstName',
        width: '80%',
      },
      {
        Header: 'Account Type',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Parent Group',
        accessor: 'gender',
        width: '40%',
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
