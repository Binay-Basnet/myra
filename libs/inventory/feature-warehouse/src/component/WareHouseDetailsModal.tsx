import { useRouter } from 'next/router';

import { DetailCardContent, Grid, Modal } from '@myra-ui';

import { useGetInventoryWarehouseDetailsQuery } from '@coop/cbs/data-access';

interface IDetailModalProps {
  isDetailModalOpen?: boolean;
  handleDetailClose: () => void;
}
export const WarehouseDetailsModal = ({
  handleDetailClose,
  isDetailModalOpen,
}: IDetailModalProps) => {
  const router = useRouter();
  const id = router?.query['id'];
  const { data } = useGetInventoryWarehouseDetailsQuery({
    id: id as string,
  });
  const warehouseData = data?.inventory?.warehouse?.getWarehouseDetails?.data;
  return isDetailModalOpen ? (
    <Modal open={isDetailModalOpen} onClose={handleDetailClose} title="Warehouse Details">
      <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
        <DetailCardContent title="Service Center" subtitle={warehouseData?.branchName} />
        <DetailCardContent title="Name" subtitle={warehouseData?.name} />
        <DetailCardContent title="Phone Number" subtitle={warehouseData?.phoneNumber} />
        <DetailCardContent title="Address" subtitle={warehouseData?.address} />
      </Grid>
    </Modal>
  ) : null;
};
