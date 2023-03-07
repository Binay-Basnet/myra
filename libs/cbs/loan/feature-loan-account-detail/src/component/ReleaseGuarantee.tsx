import { MutableRefObject } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import {
  LoanAccountGurantee,
  ReleaseGuaranteeInput,
  useLoanAccountGuaranteeActionsMutation,
} from '@coop/cbs/data-access';
import { FormFileInput, FormTextArea } from '@coop/shared/form';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

interface IReleaseGuaranteeProps {
  isAlertOpen: boolean;
  alertCancelRef: MutableRefObject<HTMLButtonElement>;
  onAlertToggle: () => void;
  onAlertClose: () => void;
  guarantee: LoanAccountGurantee | null | undefined;
}

export const ReleaseGuarantee = ({
  isAlertOpen,
  alertCancelRef,
  onAlertToggle,
  onAlertClose,
  guarantee,
}: IReleaseGuaranteeProps) => {
  const { overviewData } = useLoanAccountDetailHooks();

  const queryClient = useQueryClient();

  const methods = useForm();

  const {
    isOpen: isReleaseModalOpen,
    onClose: onReleaseModalClose,
    onToggle: onReleaseModalToggle,
  } = useDisclosure();

  const { mutateAsync: switchGuarantee } = useLoanAccountGuaranteeActionsMutation();

  const handleReleaseGuarantee = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'loan-account-detail-release-guarantee',
      promise: switchGuarantee({
        actionType: 'RELEASE',
        data: {
          loanAccID: overviewData?.generalInformation?.accountId,
          loanGuaranteeID: guarantee?.guaranteeId,
          releaseInput: values as ReleaseGuaranteeInput,
        },
      }),
      msgs: {
        loading: 'Releasing guarantee',
        success: 'Guarantee released',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanAccountGuaranteeDetails']);

        handleReleaseModalClose();
      },
    });
  };

  const handleReleaseModalClose = () => {
    methods.reset({ files: [], note: '' });
    onReleaseModalClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={alertCancelRef}
        onClose={onAlertClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              borderBottom="1px"
              borderColor="border.layout"
            >
              <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
                Release Guarantee
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
              <Text fontSize="s3" fontWeight={400} color="gray.800">
                Your guarantee will be realesed. Do you want to continue?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={alertCancelRef} variant="outline" onClick={onAlertClose}>
                Cancel
              </Button>
              <Button
                ml={3}
                onClick={() => {
                  onAlertToggle();
                  onReleaseModalToggle();
                }}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        open={isReleaseModalOpen}
        onClose={handleReleaseModalClose}
        primaryButtonLabel="Confirm"
        primaryButtonHandler={handleReleaseGuarantee}
        secondaryButtonLabel="Cancel"
        secondaryButtonHandler={handleReleaseModalClose}
        title="Release Guarantee"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s16">
            <FormFileInput name="files" label="File Upload" />
            <FormTextArea name="note" label="Note" rows={5} />
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};
