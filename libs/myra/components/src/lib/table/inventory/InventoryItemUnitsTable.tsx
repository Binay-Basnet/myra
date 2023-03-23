import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetUnitsListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryItemUnitsTable = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetUnitsListQuery({ pagination: getPaginationQuery() });

  const rowItems = data?.inventory?.unitOfMeasure?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: t['itemUnitName'],
        accessorKey: 'node.name',
      },
      {
        header: t['itemUnitShortname'],
        accessorKey: 'node.shortName',
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
      <PageHeader heading="Units" />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
