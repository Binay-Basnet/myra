import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import {
  InvItemsGroupEdge,
  useGetInventoryItemGroupQuery,
} from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';

import { TableListPageHeader } from '../../TableListPageHeader';
import { TableSearch } from '../../TableSearch';

export const InventoryItemGroupTable = () => {
  const { data, isLoading } = useGetInventoryItemGroupQuery();

  const rowItems = data?.inventory.itemsGroup?.list?.edges ?? [];

  const columns: Column<InvItemsGroupEdge>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: 'Parent Category',
        accessor: 'node.parentCategory',
        width: '40%',
      },

      {
        Header: 'Description',
        accessor: 'node.description',
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
      <TableListPageHeader heading={'Item Groups'} />
      <TableSearch />
      <Table
        data={rowItems}
        isLoading={isLoading}
        columns={columns}
        sort={true}
      />
    </>
  );
};
