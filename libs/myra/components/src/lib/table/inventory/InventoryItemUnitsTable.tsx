import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetInventoryItemsQuery } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

export const InventoryItemUnitsTable = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: t['itemUnitName'],
        accessorFn: ({ row }) => row?.node.name,
      },
      {
        header: t['itemUnitShortname'],
        accessorFn: ({ row }) => row?.node.type,
      },

      {
        header: t['itemUnitAcceptFraction'],
        accessorFn: ({ row }) => row?.node.unitPrice,
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
      <PageHeader heading="itemUnitUnits" />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
