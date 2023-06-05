import { useRouter } from 'next/router';

import { DetailCardContent, Grid, Modal } from '@myra-ui';

import { useGetInventoryItemGroupsDetailsQuery } from '@coop/cbs/data-access';

interface IDetailModalProps {
  isDetailModalOpen?: boolean;
  handleDetailClose: () => void;
}
export const ItemGroupDetailsModal = ({
  handleDetailClose,
  isDetailModalOpen,
}: IDetailModalProps) => {
  const router = useRouter();
  const id = router?.query['id'];
  const { data } = useGetInventoryItemGroupsDetailsQuery({
    id: id as string,
  });
  const warehouseData = data?.inventory?.itemsGroup?.getGroupdetails?.data;
  return isDetailModalOpen ? (
    <Modal open={isDetailModalOpen} onClose={handleDetailClose} title="Item Group Details">
      <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
        <DetailCardContent title="Item Group Name" subtitle={warehouseData?.groupName} />
        <DetailCardContent title="Under Item Group" subtitle={warehouseData?.underGroup} />

        <DetailCardContent title="Description" subtitle={warehouseData?.description} />
      </Grid>
    </Modal>
  ) : null;
};
