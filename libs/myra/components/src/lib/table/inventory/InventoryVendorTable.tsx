import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { useGetInventoryVendorQuery } from '@saccos/myra/graphql';
import { Column, Table } from '@saccos/myra/ui';

import { TableListPageHeader } from '../../TableListPageHeader';
import { TableSearch } from '../../TableSearch';

export const InventoryVendorTable = () => {
  const { data, isLoading } = useGetInventoryVendorQuery();

  const rowItems = data?.inventory.vendors?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: 'Location',
        accessor: 'node.location',
        width: '40%',
      },

      {
        Header: 'Phone Number',
        accessor: 'node.phoneNumber',
        width: '40%',
      },

      {
        Header: 'Email Address',
        accessor: 'node.email',
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
        isLoading={isLoading}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
