import { ChakraModal, Text } from '@coop/shared/ui';

interface IOverrideAlertModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const OverrideAlertModal = ({ isOpen, onCancel, onConfirm }: IOverrideAlertModalProps) => (
  <ChakraModal
    open={isOpen}
    onClose={onCancel}
    title="Override Alert"
    primaryButtonLabel="Confirm"
    primaryButtonHandler={onConfirm}
    secondaryButtonLabel="Cancel"
    secondaryButtonHandler={onCancel}
    isDanger
  >
    <Text fontSize="r1" fontWeight={400} color="gray.600">
      This member has already been assigned to an market representative. Do you want to override the
      market representative?
    </Text>
  </ChakraModal>
);
