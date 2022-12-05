import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { useGetInventoryItemsQuery } from '@coop/cbs/data-access';
import { InventoryPageHeader } from '@coop/myra/inventory/ui-layout';
import { Column, PageHeader, Table } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const InventoryItemCategoryTable = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: t['catgName'],
        accessorFn: ({ row }) => row?.node.name,
      },
      {
        header: t['catgParentCategory'],
        accessorFn: ({ row }) => row?.node.type,
      },

      {
        header: t['catgDescriptional'],
        accessorFn: ({ row }) => row?.node.unitPrice,
      },
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
      <PageHeader heading="catgItemsCategory" />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
