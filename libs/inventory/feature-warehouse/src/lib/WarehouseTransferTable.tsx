import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { IconButton } from '@chakra-ui/react';

import { InventoryPageHeader } from '@coop/myra/inventory/ui-layout';
import { useGetInventoryItemGroupQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const WarehouseTransferTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
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
        heading="warehouseTransferWarehouseTransfer"
        buttonLabel="warehouseTransferNewWarehouseTransfer"
        buttonHandler={() => router.push('/inventory/warehouse/transfer/add')}
      />

      <Table
        data={rowItems}
        isLoading={isFetching}
        columns={columns}
        sort={true}
      />
    </>
  );
};
