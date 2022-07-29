import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { IconButton } from '@chakra-ui/react';

import { InventoryPageHeader } from '@coop/myra/inventory/ui-layout';
import { useGetShareRegisterListQuery } from '@coop/shared/data-access';
import { Column } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const WarehouseTransferTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isFetching } = useGetShareRegisterListQuery();

  const rowItems = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: t['warehouseTranserDate'],
        accessor: 'node.id',
        width: '80%',
      },
      {
        Header: t['warehouseTranserEntryNo'],
        accessor: 'node.member.name.local',
        width: '40%',
      },

      {
        Header: t['warehouseTranserReference'],
        accessor: 'node.transactionDate',
        width: '40%',
      },
      {
        Header: t['warehouseTranserSourceWarehouse'],
        accessor: 'node.balance',
        width: '40%',
      },

      {
        Header: t['warehouseTranserDestinationWarehouse'],
        accessor: 'node.transactionDirection',
        width: '40%',
      },
      {
        Header: t['warehouseTranserStatus'],
        accessor: 'node.startNumber',
        width: '40%',
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
      <InventoryPageHeader
        heading="warehouseTransferWarehouseTransfer"
        buttonLabel="warehouseTransferNewWarehouseTransfer"
        buttonHandler={() => router.push('/inventory/warehouse/transfer/add')}
      />

      {/*<Table*/}
      {/*  data={rowItems}*/}
      {/*  isLoading={isFetching}*/}
      {/*  columns={columns}*/}
      {/*  sort={true}*/}
      {/*/>*/}
    </>
  );
};
