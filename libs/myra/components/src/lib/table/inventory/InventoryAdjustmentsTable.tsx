import { useMemo } from 'react';

import { Box, Column, Table } from '@myra-ui';

import { useGetInventoryAdjustmentListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { TableListPageHeader } from '../../TableListPageHeader';

export const InventoryAdjustmentsTableList = () => {
  const { t } = useTranslation();
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
      <Box position="sticky" top="0px">
        <TableListPageHeader heading="Items" />
      </Box>
      <Table
        isLoading={isFetching}
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
