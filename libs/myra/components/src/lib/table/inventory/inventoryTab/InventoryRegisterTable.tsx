import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetInventoryItemsQuery } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

export const InventoryRegisterTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsQuery();

  const rowItems = data?.inventory.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['inRegItemID'],
        accessorFn: (row) => row?.node.id,
        maxWidth: 4,
      },
      {
        header: t['inRegName'],
        accessorFn: (row) => row?.node.name,
        width: '80%',
      },
      {
        header: t['inRegType'],
        accessorFn: (row) => row?.node.type,
        meta: {
          width: '40%',
        },
      },
      {
        header: t['inRegUnitPrice'],
        accessorFn: (row) => row?.node.unitPrice,
        cell: (props) => <span>{Number(props.getValue()).toFixed(2)}</span>,
      },
      {
        id: 'total-cost',
        header: t['inRegTotalCost'],
        accessorFn: (row) => row?.node.unitPrice,
        cell: ({ row, getValue }) => (
          <span>
            {Number((getValue() as number) * (row?.original?.node?.itemQuantity || 0)).toFixed(2)}
          </span>
        ),
      },
      {
        header: t['inRegItemQuantity'],
        accessorFn: (row) => row?.node.itemQuantity,
        cell: (props) => <span>{Number(props.getValue()).toFixed(2)}</span>,
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
      <PageHeader heading={t['inventory']} />

      <Table isLoading={isFetching} data={rowItems} columns={columns} />
    </>
  );
};
