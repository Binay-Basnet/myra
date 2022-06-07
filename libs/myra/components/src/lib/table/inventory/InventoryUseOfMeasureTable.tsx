import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import { useGetInventoryUnitOfMeasureQuery } from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';

import { TableListPageHeader } from '../../TableListPageHeader';
import { TableSearch } from '../../TableSearch';

export const InventoryUseOfMeasureTable = () => {
  const { data, isLoading } = useGetInventoryUnitOfMeasureQuery();

  const rowItems = data?.inventory.unitOfMeasure?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: 'Short Name',
        accessor: 'node.shortName',
      },

      {
        Header: 'Accept Fraction',
        accessor: 'node.acceptFraction',
        Cell: ({ value }) => <div>{value.toString()}</div>,
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
    []
  );

  return (
    <>
      <TableListPageHeader heading={'Units of Measure'} />
      <TableSearch />
      <Table
        isLoading={isLoading}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
