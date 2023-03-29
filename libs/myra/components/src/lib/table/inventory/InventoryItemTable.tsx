import { useMemo } from 'react';

import { Column, Table } from '@myra-ui';

import { useGetInventoryItemsListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { TableListPageHeader } from '../../TableListPageHeader';

export const InventoryItemTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsListQuery({
    pagination: getPaginationQuery(),
  });

  const rowItems = data?.inventory?.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['itemListID'],
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: t['itemListName'],
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: t['itemListType'],
        accessorFn: (row) => row?.node?.type,
      },

      {
        id: 'total-cost',
        header: t['itemListTotalCost'],
        accessorFn: (row) => row?.node?.costPrice,
      },

      {
        header: t['itemListItemQuantity'],
        accessorFn: (row) => row?.node?.itemQuantity,
      },
      // {
      //   accessorKey: 'actions',
      //   cell: () => (
      //     <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
      //   ),
      // },
    ],
    [t]
  );

  return (
    <>
      <TableListPageHeader heading="items" />

      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        pagination={{
          total: data?.inventory?.items?.list?.totalCount ?? 'Many',
          pageInfo: data?.inventory?.items?.list?.pageInfo,
        }}
      />
    </>
  );
};
