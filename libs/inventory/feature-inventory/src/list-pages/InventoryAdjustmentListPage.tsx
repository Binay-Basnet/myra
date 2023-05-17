import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetInventoryAdjustmentListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryAdjustmentsTableList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetInventoryAdjustmentListQuery({
    pagination: getPaginationQuery(),
  });

  const rowItems = data?.inventory?.adjustment?.list?.edges ?? [];

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
        header: 'Reference',
        accessorFn: (row) => row?.node?.reference,
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
      <PageHeader heading="Inventory Adjustment Table" />
      <Table
        isLoading={isFetching}
        rowOnClick={(row) => {
          router.push(`${ROUTES.INVENTORY_INVENTORY_ADJUSTMENT_DETAILS}?id=${row?.node?.id}`);
        }}
        data={rowItems}
        columns={columns}
        pagination={{
          total: data?.inventory?.adjustment?.list?.totalCount ?? 'Many',
          pageInfo: data?.inventory?.adjustment?.list?.pageInfo,
        }}
      />
    </>
  );
};
