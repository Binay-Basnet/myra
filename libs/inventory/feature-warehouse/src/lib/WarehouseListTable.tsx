import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { useGetInventoryItemGroupQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { useTranslation } from '@coop/shared/utils';

const popoverTitle = [
  {
    title: 'warehouseTableReceived',
  },
  {
    title: 'warehouseTableEditMember',
  },
  {
    title: 'warehouseTableMakeInactive',
  },
];

export const WarehouseListTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemGroupQuery();

  const rowItems = data?.inventory.itemsGroup?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['warehouseTableName'],
        accessorFn: (row) => row?.node?.name,
        meta: {
          width: '80%',
        },
      },
      {
        header: t['warehouseTableLocation'],
        accessorFn: (row) => row?.node?.parentCategory,
        meta: {
          width: '40%',
        },
      },

      {
        header: t['warehouseTablePhoneNumber'],
        accessorFn: (row) => row?.node?.description,
        meta: {
          width: '40%',
        },
      },

      {
        id: '_actions',
        header: '',
        accessorFn: 'actions',
        cell: () => <PopoverComponent items={popoverTitle} />,
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <Table
      data={rowItems}
      isLoading={isFetching}
      columns={columns}
      // sort={true}
    />
  );
};
