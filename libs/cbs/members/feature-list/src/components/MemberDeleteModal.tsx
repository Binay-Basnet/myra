import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Modal } from '@myra-ui';

import { useDeleteDraftMutation } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

interface MemberDeleteModalProps {
  memberId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MemberDeleteModal = ({ memberId, isOpen, onClose }: MemberDeleteModalProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { mutateAsync } = useDeleteDraftMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['getMemberList']);
    },
  });

  const deleteMember = useCallback(async () => {
    if (memberId) {
      await asyncToast({
        id: 'inactive-id',
        msgs: {
          success: 'Deleted member successfully',
          loading: 'Deleting member',
        },
        onSuccess: () => {
          onClose();
        },
        promise: mutateAsync({
          memberId,
        }),
      });
    }
  }, [memberId, mutateAsync, onClose]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="yes"
      secondaryButtonLabel="cancel"
      width="600px"
      primaryButtonHandler={deleteMember}
    >
      {t['memberDeleteConfirm']}
    </Modal>
  );
};
