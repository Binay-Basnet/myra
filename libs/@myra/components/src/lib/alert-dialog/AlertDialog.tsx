import { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useBeforeUnload } from 'react-use';
import Router, { useRouter } from 'next/router';

import { Icon, IconButton } from '@myra-ui/foundations';

import { Modal } from '../overlays';

export const useLeavePageConfirm = (
  isConfirm = true,
  message = 'Are you sure want to leave this page?'
) => {
  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const handler = () => {
      if (isConfirm && !window.confirm(message)) {
        throw new Error('Route Canceled');
      }
    };

    Router.events.on('routeChangeStart', handler);

    return () => {
      Router.events.off('routeChangeStart', handler);
    };
  }, [isConfirm, message]);
};

interface AlertDialogProps {
  isFormDirty: boolean;
  title?: string;
  description?: string;

  closeLink?: string;
}

export const AlertDialog = ({ isFormDirty, title, description, closeLink }: AlertDialogProps) => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const unsavedChangesHandler = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';

    if (isFormDirty) {
      setShowDialog(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', unsavedChangesHandler);

    return () => {
      window.removeEventListener('beforeunload', unsavedChangesHandler);
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      if (isFormDirty) {
        setShowDialog(true);
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'Route Canceled';
      }
    };

    Router.events.on('beforeHistoryChange', handler);

    return () => {
      Router.events.off('beforeHistoryChange', handler);
    };
  }, [isFormDirty]);

  return (
    <>
      <IconButton
        variant="ghost"
        aria-label="close"
        color="gray.500"
        height="40px"
        icon={<Icon as={IoClose} size="lg" />}
        onClick={() => {
          if (isFormDirty) {
            setShowDialog(true);
          } else if (closeLink) {
            router.push(closeLink);
          } else {
            router.back();
          }
        }}
      />

      <Modal
        open={showDialog}
        title={title || 'Are you sure want to leave this page?'}
        onClose={() => setShowDialog(false)}
        primaryButtonHandler={() => router.back()}
        primaryButtonLabel="Leave"
        isDanger
        secondaryButtonLabel="Stay"
        secondaryButtonHandler={() => setShowDialog(false)}
      >
        {description ||
          'You have unsaved changes. All changes will be lost. Do you really want to leave?'}
      </Modal>
    </>
  );
};

export default AlertDialog;
