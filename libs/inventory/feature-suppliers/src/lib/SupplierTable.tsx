import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { useGetInventoryItemsQuery } from '@coop/cbs/data-access';
import { TableListPageHeader } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const SupplierTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: t['supplierName'],
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: t['supplierLocation'],
        accessor: 'node.type',
        width: '40%',
      },

      {
        Header: t['supplierPhoneNumber'],
        accessor: 'node.unitPrice',
        width: '40%',
      },

      {
        Header: t['supplierEmailAddress'],
        accessor: 'node.itemQuantity',
        width: '40%',
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
      <TableListPageHeader heading="supplier" />

      <Table data={rowItems} isLoading={isFetching} columns={columns} sort />
    </>
  );
};
