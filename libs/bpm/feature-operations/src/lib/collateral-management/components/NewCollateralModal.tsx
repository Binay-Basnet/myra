import { FormSection, GridItem, Modal } from '@myra-ui';

interface Props {
  isCollateralModalOpen: boolean;
  handleCloseCollateralModal: () => void;
}

const NewCollateralModal = (props: Props) => {
  const { isCollateralModalOpen, handleCloseCollateralModal } = props;

  return (
    <Modal
      open={isCollateralModalOpen}
      onClose={handleCloseCollateralModal}
      isCentered
      title="New Collateral"
      width="xl"
    >
      <FormSection templateColumns={3} divider>
        <GridItem colSpan={3}>wip</GridItem>
      </FormSection>
    </Modal>
  );
};

export default NewCollateralModal;
