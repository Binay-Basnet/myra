import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { useGetInventoryItemsQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { TableListPageHeader } from '../../TableListPageHeader';

export const InventoryItemTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: t['itemListID'],
        accessorFn: ({ row }) => row?.node.id,
      },

      {
        header: t['itemListName'],
        accessorFn: ({ row }) => row?.node.name,
      },
      {
        header: t['itemListType'],
        accessorFn: ({ row }) => row?.node.type,
      },

      {
        header: t['itemListUnitPrice'],
        accessorFn: ({ row }) => row?.node.unitPrice,
      },

      {
        id: 'total-cost',
        header: t['itemListTotalCost'],
        accessorFn: ({ row }) => row?.node.unitPrice,
      },

      {
        header: t['itemListItemQuantity'],
        accessorFn: ({ row }) => row?.node.itemQuantity,
      },
      {
        accessorKey: 'actions',
        cell: () => (
          <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <TableListPageHeader heading="items" />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
