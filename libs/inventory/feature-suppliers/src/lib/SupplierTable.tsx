import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { TableListPageHeader } from '@coop/myra/components';
import { useGetInventoryItemGroupQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const SupplierTable = () => {
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
      <TableListPageHeader heading={'warehouseLayoutWarehouse'} />

      <Table
        data={rowItems}
        isLoading={isFetching}
        columns={columns}
        sort={true}
      />
    </>
  );
};
