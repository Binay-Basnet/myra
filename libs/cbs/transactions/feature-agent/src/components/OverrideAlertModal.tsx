import { ChakraModal, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

interface IOverrideAlertModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const OverrideAlertModal = ({ isOpen, onCancel, onConfirm }: IOverrideAlertModalProps) => {
  const { t } = useTranslation();

  return (
    <ChakraModal
      open={isOpen}
      onClose={onCancel}
      title={t['agentAssignedMembersOverrideAlert']}
      primaryButtonLabel={t['agentAssignedMembersConfirm']}
      primaryButtonHandler={onConfirm}
      secondaryButtonLabel={t['agentAssignedMembersCancel']}
      secondaryButtonHandler={onCancel}
      isDanger
    >
      <Text fontSize="r1" fontWeight={400} color="gray.600">
        {t['agentAssignedMembersHelperText']}
      </Text>
    </ChakraModal>
  );
};
