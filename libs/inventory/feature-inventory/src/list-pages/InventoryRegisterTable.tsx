import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetInventoryRegisterListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryRegisterTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryRegisterListQuery({
    pagination: getPaginationQuery(),
  });

  const rowItems = data?.inventory?.register?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: 'Item Id',
        accessorFn: (row) => row?.node?.id,
        maxWidth: 4,
      },
      {
        header: 'Type',
        accessorFn: (row) => row?.node?.transaction_type,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.itemName,
        meta: {
          width: '40%',
        },
      },

      {
        header: 'Unit Price',
        accessorFn: (row) => row?.node?.unitPrice,
      },
      {
        header: 'Total Cost',
        accessorFn: (row) => row?.node?.totalCost,
      },
      {
        header: 'Item Quantity',
        accessorFn: (row) => row?.node?.quantity,
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading={t['inventory']} />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
