import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { useGetInventoryItemsQuery } from '@saccos/myra/graphql';
import { Column, Table } from '@saccos/myra/ui';

import { TableListPageHeader } from '../../TableListPageHeader';
import { TableSearch } from '../../TableSearch';

export const InventoryItemTable = () => {
  const { data, isLoading } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: 'Item Id',
        accessor: 'node.id',
        maxWidth: 4,
      },

      {
        Header: 'Name',
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: 'Type',
        accessor: 'node.type',
        width: '40%',
      },

      {
        Header: 'Unit Price',
        accessor: 'node.unitPrice',
        Cell: ({ value }) => {
          return <span>{Number(value).toFixed(2)}</span>;
        },
      },

      {
        id: 'total-cost',
        Header: 'Total Cost',
        accessor: 'node.unitPrice',
        Cell: ({ value, row }) => {
          return (
            <span>
              {Number(value * row.original.node.itemQuantity).toFixed(2)}
            </span>
          );
        },
      },

      {
        Header: 'Item Quantity',
        accessor: 'node.itemQuantity',
        Cell: ({ value }) => {
          return <span>{Number(value).toFixed(2)}</span>;
        },
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
        isLoading={isLoading}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
