import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table } from '@myra-ui';

import {
  useGetInventoryWarehouseTransferQuery,
  WarehouseTransferType,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { TableListPageHeader } from '@coop/myra/components';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const WarehouseTransferTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryWarehouseTransferQuery({
    pagination: getPaginationQuery(),
    filter: {
      transferType: WarehouseTransferType?.Direct,
    },
  });
  const router = useRouter();

  const rowItems = data?.inventory?.warehouse?.listTransfers?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => localizedDate(row?.node?.date),
      },
      {
        header: 'Entry No',
        accessorFn: (row) => row?.node?.entryNo,
      },

      {
        id: 'total-cost',

        header: 'Reference',
        accessorFn: (row) => row?.node?.reference,
      },

      {
        header: 'Source Warehouse',
        accessorFn: (row) => row?.node?.sourceWarehouseName,
      },
      {
        header: 'Destination Warehouse',
        accessorFn: (row) => row?.node?.destinationWarehouseName,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
      },
    ],
    [t]
  );

  return (
    <>
      <TableListPageHeader heading="Warehouse Transfer" />

      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.INVENTORY_WAREHOUSE_TRANSFER_DETAILS}?id=${row?.node?.id}`);
        }}
        pagination={{
          total: data?.inventory?.warehouse?.listTransfers?.totalCount ?? 'Many',
          pageInfo: data?.inventory?.warehouse?.listTransfers?.pageInfo,
        }}
      />
    </>
  );
};
