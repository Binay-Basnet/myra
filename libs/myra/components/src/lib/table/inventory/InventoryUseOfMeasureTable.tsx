import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { useGetInventoryUnitOfMeasureQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui';

import { TableListPageHeader } from '../../TableListPageHeader';

export const InventoryUseOfMeasureTable = () => {
  const { data, isFetching } = useGetInventoryUnitOfMeasureQuery();

  const rowItems = data?.inventory.unitOfMeasure?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0] | any>[]>(
    () => [
      {
        header: 'Name',
        accessorFn: ({ row }) => row?.node.name,
      },
      {
        header: 'Short Name',
        accessorFn: ({ row }) => row?.node.shortName,
      },

      {
        header: 'Accept Fraction',
        accessorFn: ({ row }) => row?.node.acceptFraction,
        cell: (props) => <div>{props.getValue()?.toString()}</div>,
      },

      {
        accessorKey: 'actions',
        cell: () => (
          <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
        ),
      },
    ],
    []
  );

  return (
    <>
      <TableListPageHeader heading="Units of Measure" />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
