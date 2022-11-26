import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { useGetInventoryItemsQuery } from '@coop/cbs/data-access';
import { InventoryPageHeader } from '@coop/myra/inventory/ui-layout';
import { Column, Table } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const InventoryAdjustmentsTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: t['itemUnitsDate'],
        accessor: 'node.name',
      },
      {
        Header: t['itemUnitsEntryNo'],
        accessor: 'node.type',
      },

      {
        Header: t['itemUnitsReference'],
        accessor: 'node.unitPrice',
        width: '50%',
      },
      {
        accessor: 'actions',
        Cell: () => (
          <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <InventoryPageHeader heading="itemUnitInventoryAdjustment" />

      <Table isLoading={isFetching} data={rowItems} columns={columns} sort />
    </>
  );
};
