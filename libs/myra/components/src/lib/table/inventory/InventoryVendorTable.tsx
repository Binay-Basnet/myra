import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { Column, Table } from '@saccos/myra/ui';

import { TableListPageHeader } from '../../TableListPageHeader';
import { TableSearch } from '../../TableSearch';

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

export const InventoryVendorTable = () => {
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName',
        width: '80%',
      },
      {
        Header: 'Location',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Phone Number',
        accessor: 'gender',
        width: '40%',
      },

      {
        Header: 'Email Address',
        accessor: 'id',
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
    <>
      <TableListPageHeader heading={'Vendor'} />
      <TableSearch />

      <Table
        data={[
          {
            firstName: 'Hello',
            location: 'Patan, Lalitpur',
            gender: '301849-3910',
            id: '123',
          },
        ]}
        columns={columns}
        sort={true}
      />
    </>
  );
};
