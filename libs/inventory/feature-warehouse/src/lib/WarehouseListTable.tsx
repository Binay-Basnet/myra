import { useMemo } from 'react';

import { PopoverComponent } from '@coop/myra/components';
import { useGetInventoryItemGroupQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
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
        Header: t['warehouseTableName'],
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: t['warehouseTableLocation'],
        accessor: 'node.parentCategory',
        width: '40%',
      },

      {
        Header: t['warehouseTablePhoneNumber'],
        accessor: 'node.description',
        width: '40%',
      },

      {
        id: '_actions',
        Header: '',
        accessor: 'actions',
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
      sort={true}
    />
  );
};
