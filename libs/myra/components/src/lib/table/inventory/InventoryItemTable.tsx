import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { InvItemsEdge, useGetInventoryItemsQuery } from '@saccos/myra/graphql';
import { Column, Table } from '@saccos/myra/ui';

import { TableListPageHeader } from '../../TableListPageHeader';
import { TableSearch } from '../../TableSearch';

export const InventoryItemTable = () => {
  const { data, isLoading } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns: Column<InvItemsEdge>[] = useMemo(
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
        Header: 'Total Cost',
        accessor: 'cursor',
        Cell: ({ row }) => {
          return (
            <span>
              {Number(
                row.original.node.unitPrice * row.original.node.itemQuantity
              ).toFixed(2)}
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
