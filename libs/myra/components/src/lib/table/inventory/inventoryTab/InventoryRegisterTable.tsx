import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { useGetInventoryItemsQuery } from '@coop/shared/data-access';
import { Column, Table, TableListPageHeader } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const InventoryRegisterTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: t['inRegItemID'],
        accessor: 'node.id',
        maxWidth: 4,
      },
      {
        Header: t['inRegName'],
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: t['inRegType'],
        accessor: 'node.type',
        width: '40%',
      },
      {
        Header: t['inRegUnitPrice'],
        accessor: 'node.unitPrice',
        Cell: ({ value }) => {
          return <span>{Number(value).toFixed(2)}</span>;
        },
      },
      {
        id: 'total-cost',
        Header: t['inRegTotalCost'],
        accessor: 'node.unitPrice',
        Cell: ({ value, row }) => {
          return (
            <span>
              {Number(value * row.original.node.itemQuantity).toFixed(2)}
            </span>
          );
        },
      },
      {
        Header: t['inRegItemQuantity'],
        accessor: 'node.itemQuantity',
        Cell: ({ value }) => {
          return <span>{Number(value).toFixed(2)}</span>;
        },
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
    [t]
  );

  return (
    <>
      <TableListPageHeader heading={'items'} />

      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
