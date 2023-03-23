import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetItemCategoryListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryItemCategoryTable = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetItemCategoryListQuery({ pagination: getPaginationQuery() });

  const rowItems = data?.inventory?.itemsGroup?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: t['catgName'],
        accessorKey: 'node.name',
      },
      {
        header: t['catgParentCategory'],
        accessorKey: 'node.description',
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
      <PageHeader heading="Item Category" />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
