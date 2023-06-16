import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Column, PageHeader, Table, TablePopover } from '@myra-ui';

import {
  useGetInventoryWarehouseTransferQuery,
  useSetInventoryWarehouseRequestAcceptHandlerMutation,
  WarehouseRequestResponse,
  WarehouseTransferStatus,
  WarehouseTransferType,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

import { WarehouseRequestDetailsModal } from '../component/WareHouseRequestDetails';

const WAREHOUSE_REQUEST_TAB_ITEMS = [
  {
    title: 'On-Transit',
    key: 'ON_TRANSIT',
  },
  {
    title: 'Completed',
    key: 'COMPLETED',
  },

  {
    title: 'Rejected',
    key: 'REJECTED',
  },
];

export const WarehouseRequestTable = () => {
  const [objStatus, setobjStatus] = useState('ON_TRANSIT');
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isFetching } = useGetInventoryWarehouseTransferQuery({
    pagination: getPaginationQuery(),
    filter: {
      transferType: WarehouseTransferType?.Request,
      objState: (router.query['objState'] ??
        WarehouseTransferStatus.OnTransit) as WarehouseTransferStatus,
    },
  });

  useEffect(() => {
    setobjStatus(router?.query['objState'] as string);
  }, [router]);

  const onOpenDetailsModal = () => {
    setOpenDetailModal(true);
  };

  const onCloseDetailsModal = () => {
    setOpenDetailModal(false);
  };

  const rowItems = useMemo(() => data?.inventory?.warehouse?.listTransfers?.edges ?? [], [data]);

  const { mutateAsync: makeActiveMutation } =
    useSetInventoryWarehouseRequestAcceptHandlerMutation();

  const handleMakeActive = async (id: string, response: WarehouseRequestResponse) => {
    await asyncToast({
      id: 'loan-settings',
      msgs: {
        success: 'Accepting Warehouse Transfer',
        loading: 'Warehouse Transfer Accepted',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getInventoryWarehouseTransfer']);
        router.push(`${ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST}?objState=COMPLETED`);
      },

      promise: makeActiveMutation({
        data: {
          response,
          transferId: id,
        },
      }),
    });
  };
  const handleReject = async (id: string, response: WarehouseRequestResponse) => {
    await asyncToast({
      id: 'loan-settings',
      msgs: {
        success: 'Rejecting Warehouse Transfer',
        loading: 'Warehouse Transfer Rejected',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getInventoryWarehouseTransfer']);
        router.push(`${ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST}?objState=REJECTED`);
      },

      promise: makeActiveMutation({
        data: {
          response,
          transferId: id,
        },
      }),
    });
  };

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
        id: 'total-cost',

        header: 'Reference',
        accessorFn: (row) => row?.node?.reference,
      },

      {
        header: 'Source Warehouse',
        accessorFn: (row) => row?.node?.sourceWarehouseName,
      },
      {
        header: 'Destination Warehouse',
        accessorFn: (row) => row?.node?.destinationWarehouseName,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            items={
              objStatus === WarehouseTransferStatus.OnTransit || !objStatus
                ? [
                    {
                      title: 'Accept Transfer',
                      aclKey: 'CBS_MEMBERS_MEMBER',

                      onClick: (row) => handleMakeActive(row?.id, WarehouseRequestResponse?.Accept),
                    },
                    {
                      title: 'Reject Transfer',
                      aclKey: 'CBS_MEMBERS_MEMBER',

                      onClick: (row) => handleReject(row?.id, WarehouseRequestResponse?.Reject),
                    },
                    {
                      title: 'View Details',
                      aclKey: 'CBS_MEMBERS_MEMBER',

                      onClick: (row) => {
                        router.push(`${ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST}?id=${row?.id}`);
                        onOpenDetailsModal();
                      },
                    },
                  ]
                : [
                    {
                      title: 'View Details',
                      aclKey: 'CBS_MEMBERS_MEMBER',

                      onClick: (row) => {
                        router.push(`${ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST}?id=${row?.id}`);
                        onOpenDetailsModal();
                      },
                    },
                  ]
            }
            node={props?.row?.original?.node}
          />
        ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [objStatus, router]
  );

  return (
    <>
      <PageHeader heading="Warehouse Requests" tabItems={WAREHOUSE_REQUEST_TAB_ITEMS} />

      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST}?id=${row?.node?.id}`);
          onOpenDetailsModal();
        }}
        pagination={{
          total: data?.inventory?.warehouse?.listTransfers?.totalCount ?? 'Many',
          pageInfo: data?.inventory?.warehouse?.listTransfers?.pageInfo,
        }}
      />
      <WarehouseRequestDetailsModal
        isDetailModalOpen={openDetailModal}
        handleDetailClose={onCloseDetailsModal}
      />
    </>
  );
};
