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

export const InventoryItemTable = () => {
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Item Id',
        accessor: 'id',
        maxWidth: 4,
      },

      {
        Header: 'Name',
        accessor: 'firstName',
        width: '80%',
      },
      {
        Header: 'Type',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Unit Price',
        accessor: 'gender',
        maxWidth: 2,
      },

      {
        Header: 'Total Cost',
        accessor: 'dateOfBirth',
        maxWidth: 2,
      },

      {
        Header: 'Item Quantity',
        accessor: 'lastName',
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

  return (
    <>
      <TableListPageHeader heading={'Items'} />
      <TableSearch />

      <Table
        data={[
          {
            firstName: 'Hello',
            lastName: '123',
            title: '123',
            dateOfBirth: '1331',
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
