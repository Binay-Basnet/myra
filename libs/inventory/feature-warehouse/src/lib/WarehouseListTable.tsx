import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useGetWarehouseListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { WarehouseAddModal } from '../component/WareHouseAddModal';
import { WarehouseDetailsModal } from '../component/WareHouseDetailsModal';

export const WarehouseListTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetWarehouseListQuery({ paginate: getPaginationQuery() });
  const router = useRouter();

  const rowItems = data?.inventory?.warehouse?.listWarehouses?.edges ?? [];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenWarehouse,
    onOpen: onOpenWareHouse,
    onClose: onCLoseWarehouse,
  } = useDisclosure();

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
      {
        id: '_actions',
        header: '',

        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit Warehouse',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    router.push(
                      `${ROUTES?.INVENTORY_WAREHOUSE}?id=${props?.row?.original?.node?.id}`
                    );
                    onOpenWareHouse();
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '20px',
        },
      },
    ],
    [t]
  );
  const pageHeaderHandler = async () => {
    await router.push({ query: {} });
    onOpenWareHouse();
  };

  return (
    <>
      <PageHeader
        heading="Warehouse"
        button
        buttonTitle="Add new Warehouse"
        onClick={pageHeaderHandler}
      />
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
      <WarehouseAddModal
        isAddWareHouseModalOpen={isOpenWarehouse}
        handleWarehouseClose={onCLoseWarehouse}
      />
    </>
  );
};
