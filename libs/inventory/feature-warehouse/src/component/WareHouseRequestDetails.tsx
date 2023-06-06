import { useRouter } from 'next/router';

import { DetailCardContent, Grid, Modal } from '@myra-ui';

import { useGetInventoryWarehouseRequestTransferDetailsQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

interface IDetailModalProps {
  isDetailModalOpen?: boolean;
  handleDetailClose: () => void;
}
export const WarehouseRequestDetailsModal = ({
  handleDetailClose,
  isDetailModalOpen,
}: IDetailModalProps) => {
  const router = useRouter();
  const id = router?.query['id'];
  const { data } = useGetInventoryWarehouseRequestTransferDetailsQuery({
    id: id as string,
  });
  const warehouseData = data?.inventory?.warehouse?.getWarehouseTransferDetail?.data;
  return isDetailModalOpen ? (
    <Modal
      open={isDetailModalOpen}
      onClose={handleDetailClose}
      title="Warehouse Transfer Request Details"
    >
      <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
        <DetailCardContent
          title="Date"
          subtitle={localizedDate(warehouseData?.transferEntry?.date)}
        />
        <DetailCardContent title="Entry No" subtitle={warehouseData?.transferEntry?.entryNo} />
        <DetailCardContent title="Refrence" subtitle={warehouseData?.transferEntry?.reference} />
        <DetailCardContent
          title="Source Warehouse"
          subtitle={warehouseData?.transferEntry?.sourceWarehouseName}
        />
        <DetailCardContent
          title="Destination Warehouse"
          subtitle={warehouseData?.transferEntry?.destinationWarehouseName}
        />
        <DetailCardContent title="Status" subtitle={warehouseData?.transferEntry?.status} />
      </Grid>
    </Modal>
  ) : null;
};
