import { useRouter } from 'next/router';

import { Modal } from '../overlays';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

export const AlertDialog = ({ show, onClose }: ModalProps) => {
  const router = useRouter();

  const handleStayOnPage = () => {
    onClose();
  };

  return (
    <Modal
      open={show}
      title="Are you sure want to leave this page?"
      onClose={handleStayOnPage}
      primaryButtonHandler={() => router.back()}
      primaryButtonLabel="Leave"
      isDanger
      secondaryButtonLabel="Stay"
      secondaryButtonHandler={handleStayOnPage}
    >
      You have unsaved changes. All changes will be lost. Do you really want to leave?
    </Modal>
  );
};

export default AlertDialog;
