import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { useGetWarehouseListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const WarehouseListTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetWarehouseListQuery({ paginate: getPaginationQuery() });

  const rowItems = data?.inventory?.warehouse?.listWarehouses?.edges ?? [];

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
        accessorFn: (row) => row?.node?.address,
        meta: {
          width: '40%',
        },
      },

      {
        header: t['warehouseTablePhoneNumber'],
        accessorFn: (row) => row?.node?.phoneNumber,
        meta: {
          width: '40%',
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
