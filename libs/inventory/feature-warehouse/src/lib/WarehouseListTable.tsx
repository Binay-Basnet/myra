import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { useGetWarehouseListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

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
  const { data, isFetching } = useGetWarehouseListQuery({ paginate: getPaginationQuery() });

  const rowItems = data?.inventory?.warehouse?.listWarehouses?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['warehouseTableName'],
        accessorKey: 'node.name',
        meta: {
          width: '80%',
        },
      },
      {
        header: t['warehouseTableLocation'],
        accessorKey: 'node.address',
        meta: {
          width: '40%',
        },
      },

      {
        header: t['warehouseTablePhoneNumber'],
        accessorKey: 'node.phoneNumber',
        meta: {
          width: '40%',
        },
      },

      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: () => <PopoverComponent items={popoverTitle} />,
        meta: {
          width: 's60',
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
