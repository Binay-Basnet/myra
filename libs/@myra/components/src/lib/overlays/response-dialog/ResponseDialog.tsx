import React, { useState } from 'react';
import { Box, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import {
  ErrorCard,
  ErrorCardProps,
  LoaderOverlay,
  SuccessCard,
  SuccessCardProps,
} from '@myra-ui/components';

import { findError, getError, MutationError } from '../../feedbacks';

export interface ResponseDialogProps<T extends Record<string, unknown>> {
  successCardProps: (response: T) => SuccessCardProps;
  errorCardProps: ErrorCardProps;
  promise: () => Promise<T>;
  children: React.ReactNode;
  onSuccess?: (response: T | null) => void;
  onError?: (error: MutationError) => void;
}

export const ResponseDialog = <T extends Record<string, unknown>>({
  successCardProps,
  errorCardProps,
  promise,
  children,
  onError,
  onSuccess,
}: ResponseDialogProps<T>) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [finalResponse, setFinalResponse] = useState<T | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const successModalProps = useDisclosure();
  const errorModalProps = useDisclosure();

  return (
    <>
      {isLoading && <LoaderOverlay />}
      <Box
        onClick={async () => {
          setIsLoading(true);

          const response = await promise();

          if (response) {
            if ('error' in response) {
              if (typeof response['error'] === 'string') {
                setIsLoading(false);
                errorModalProps.onToggle();
                setErrorMessage(response['error']);
                return;
              }
              errorModalProps.onToggle();

              setErrorMessage(
                (response as unknown as { error: { message: string }[] }).error[0].message ||
                  'Something Went Wrong'
              );
              setIsLoading(false);
            } else {
              const errorKeys = findError(response, 'error');

              if (errorKeys[0]) {
                const error = getError(errorKeys[0]);

                if (typeof error === 'string') {
                  onError && onError(errorKeys[0]);
                  setErrorMessage(error);
                  errorModalProps.onToggle();
                  setIsLoading(false);
                } else {
                  setErrorMessage('Some fields are empty or Invalid');
                  errorModalProps.onToggle();
                  setIsLoading(false);
                }
              } else {
                setFinalResponse(response);
                setIsLoading(false);
                successModalProps.onToggle();
              }
            }
          }
        }}
      >
        {children}
      </Box>

      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
        isOpen={successModalProps.isOpen}
        onClose={successModalProps.onClose}
      >
        <ModalOverlay />

        <ModalContent overflow="hidden" maxW="500px" borderRadius="br3">
          <SuccessCard
            {...successCardProps(finalResponse as T)}
            closeModal={() => successModalProps.onToggle()}
            completeHandler={() => (onSuccess ? onSuccess(finalResponse as T) : null)}
          />
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
        isOpen={errorModalProps.isOpen}
        onClose={errorModalProps.onClose}
      >
        <ModalOverlay />
        <ModalContent overflow="hidden" maxW="500px" borderRadius="br3">
          <ErrorCard
            {...errorCardProps}
            subTitle={errorMessage}
            goBackHandler={() => errorModalProps.onToggle()}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
export default ResponseDialog;
