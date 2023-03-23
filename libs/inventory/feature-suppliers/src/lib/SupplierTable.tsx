import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetInventoryItemsQuery } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

export const SupplierTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['supplierName'],
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: t['supplierLocation'],
        accessorFn: (row) => row?.node?.type,
      },

      // {
      //   header: t['supplierPhoneNumber'],
      //   accessorFn: (row) => row?.node.unitPrice,
      // },

      {
        accessorKey: 'actions',
        cell: () => (
          <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading="supplier" />

      <Table data={rowItems} isLoading={isFetching} columns={columns} />
    </>
  );
};
