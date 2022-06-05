import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { Column, Table } from '@saccos/myra/ui';

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName?: string;
  gender: string;
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

  return (
    <Table
      data={[
        {
          id: '0012',
          firstName: '123',
          title: 'Account Test',
          gender: 'Account Group',
        },
      ]}
      columns={columns}
      sort={true}
    />
  );
};
