import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Column, Table } from '@myra-ui/table';

import { useGetWarehouseListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { WarehouseDetailsModal } from '../component/WareHouseDetailsModal';

export const WarehouseListTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetWarehouseListQuery({ paginate: getPaginationQuery() });
  const router = useRouter();

  const rowItems = data?.inventory?.warehouse?.listWarehouses?.edges ?? [];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['warehouseTableName'],
        accessorFn: (row) => row?.node?.name,
        meta: {
          width: '80%',
        },
      },
      {
        header: t['warehouseTableLocation'],
        accessorFn: (row) => row?.node?.address,
        meta: {
          width: '40%',
        },
      },

      {
        header: t['warehouseTablePhoneNumber'],
        accessorFn: (row) => row?.node?.phoneNumber,
        meta: {
          width: '40%',
        },
      },
      {
        header: 'Service Center Name',
        accessorFn: (row) => row?.node?.branchName,
        meta: {
          width: '40%',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <Table
        data={rowItems}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.INVENTORY_WAREHOUSE}?id=${row?.node?.id}`);
          onOpen();
        }}
        // sort={true}
      />
      <WarehouseDetailsModal isDetailModalOpen={isOpen} handleDetailClose={onClose} />
    </>
  );
};
