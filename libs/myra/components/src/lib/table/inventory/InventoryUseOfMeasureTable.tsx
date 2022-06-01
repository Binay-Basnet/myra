import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { Column, Table } from '@saccos/myra/ui';

enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
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

export const InventoryUseOfMeasureTable = () => {
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName',
        width: '80%',
      },
      {
        Header: 'Short Name',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Accept Fraction',
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
          firstName: 'Test Unit',
          title: 'TU',
          gender: 'false',
        },
      ]}
      columns={columns}
      sort={true}
    />
  );
};
