import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Column, Table, TablePopover, toast } from '@myra-ui';

import {
  useGetInventoryWarehouseTransferQuery,
  useSetInventoryWarehouseRequestAcceptHandlerMutation,
  WarehouseRequestResponse,
  WarehouseTransferType,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { TableListPageHeader } from '@coop/myra/components';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { WarehouseRequestDetailsModal } from '../component/WareHouseRequestDetails';

export const WarehouseRequestTable = () => {
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isFetching } = useGetInventoryWarehouseTransferQuery({
    pagination: getPaginationQuery(),
    filter: {
      transferType: WarehouseTransferType?.Request,
    },
  });

  const onOpenDetailsModal = () => {
    setOpenDetailModal(true);
  };

  const onCloseDetailsModal = () => {
    setOpenDetailModal(false);
  };

  const rowItems = data?.inventory?.warehouse?.listTransfers?.edges ?? [];

  const { mutateAsync: makeActiveMutation } =
    useSetInventoryWarehouseRequestAcceptHandlerMutation();

  const makeActiveHandler = useCallback(
    (id: string, response: WarehouseRequestResponse) => {
      makeActiveMutation({
        data: {
          response,
          transferId: id,
        },
      }).then(() => {
        toast({
          id: 'Accepting Warehouse Transfer',
          type: 'success',
          message: 'Warehouse Transfer Accepting',
        });
        queryClient.invalidateQueries(['getInventoryWarehouseTransfer']);
        router.push(ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST);
      });
    },

    [makeActiveMutation, queryClient, router]
  );

  const rejectRequestHandler = useCallback(
    (id: string, response: WarehouseRequestResponse) => {
      makeActiveMutation({
        data: {
          response,
          transferId: id,
        },
      }).then(() => {
        toast({
          id: 'Rejecting Warehouse Transfer',
          type: 'warning',
          message: 'Warehouse Transfer Rejected',
        });
        queryClient.invalidateQueries(['getInventoryWarehouseTransfer']);
        router.push(ROUTES.INVENTORY_WAREHOUSE_TRASFER_LIST);
      });
    },

    [makeActiveMutation, queryClient, router]
  );
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
        cell: (props) => {
          props?.row?.original?.node?.status !== 'COMPLETED' ? (
            <TablePopover
              items={[
                {
                  title: 'Accept Transfer',
                  aclKey: 'CBS_MEMBERS_MEMBER',

                  onClick: (row) => makeActiveHandler(row?.id, WarehouseRequestResponse?.Accept),
                },
                {
                  title: 'Reject Transfer',
                  aclKey: 'CBS_MEMBERS_MEMBER',

                  onClick: (row) => rejectRequestHandler(row?.id, WarehouseRequestResponse?.Reject),
                },
                {
                  title: 'View Details',
                  aclKey: 'CBS_MEMBERS_MEMBER',

                  onClick: (row) => {
                    router.push(`${ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST}?id=${row?.id}`);
                    onOpenDetailsModal();
                  },
                },
              ]}
              node={props?.row?.original?.node}
            />
          ) : (
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  aclKey: 'CBS_MEMBERS_MEMBER',

                  onClick: (row) => {
                    router.push(`${ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST}?id=${row?.id}`);
                    onOpenDetailsModal();
                  },
                },
              ]}
              node={props?.row?.original?.node}
            />
          );
        },
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <TableListPageHeader heading="Warehouse Requests" />

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
