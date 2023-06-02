import { useRouter } from 'next/router';

import { DetailCardContent, Grid, Modal } from '@myra-ui';

import { useGetInventoryUnitsDetailsQuery } from '@coop/cbs/data-access';

interface IDetailModalProps {
  isDetailModalOpen?: boolean;
  handleDetailClose: () => void;
}
export const UnitsDetailsModal = ({ handleDetailClose, isDetailModalOpen }: IDetailModalProps) => {
  const router = useRouter();
  const id = router?.query['id'];
  const { data } = useGetInventoryUnitsDetailsQuery({
    id: id as string,
  });
  const warehouseData = data?.inventory?.unitOfMeasure?.getUnitDetails?.data;
  return isDetailModalOpen ? (
    <Modal open={isDetailModalOpen} onClose={handleDetailClose} title="Unit of Measure Details">
      <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
        <DetailCardContent title="Name" subtitle={warehouseData?.unitName} />
        <DetailCardContent title="Short Name" subtitle={warehouseData?.shortName} />

        <DetailCardContent title="Description" subtitle={warehouseData?.description} />
      </Grid>
    </Modal>
  ) : null;
};
