import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, Table } from '@myra-ui';

enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
}

interface IAccountListTableProps {
  data: any;
  isLoading: boolean;
}

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: Gender;
  title?: string | null;
  dateOfBirth?: string | null;
};

export const AccountListTable = ({ data, isLoading }: IAccountListTableProps) => {
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Account Code',
        accessor: 'id',
        maxWidth: 4,
      },
      {
        Header: 'Name',
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
          <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
        ),
      },
    ],
    []
  );

  const rowData = useMemo(() => data && data?.members?.list, [data]);

  return <Table isLoading={isLoading} data={rowData?.slice(0, 10) ?? []} columns={columns} sort />;
};
