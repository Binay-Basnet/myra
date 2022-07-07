import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { IconButton } from '@chakra-ui/react';

import { InventoryPageHeader } from '@coop/myra/inventory/ui-layout';
import { useGetInventoryItemsQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const InventoryAdjustmentsTable = () => {
  const router = useRouter();
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
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<BsThreeDots />}
          />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <InventoryPageHeader
        heading="itemUnitInventoryAdjustment"
        buttonLabel="itemUnitsNewInventoryAdjustment"
        buttonHandler={() =>
          router.push('/inventory/inventory/adjustments/[action]')
        }
      />

      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
