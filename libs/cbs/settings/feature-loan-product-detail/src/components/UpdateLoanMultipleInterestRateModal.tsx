import { useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  InterestRateSetupInput,
  useGetEndOfDayDateDataQuery,
  useUpdateLoanMultipleInterestRateMutation,
} from '@coop/cbs/data-access';
import { ConfirmationDialog } from '@coop/shared/components';
import { FormCBSDatePicker, FormFileInput, FormInput, FormTextArea } from '@coop/shared/form';

interface IUpdateLoanMultipleInterestRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountIds: string[];
}

export const UpdateLoanMultipleInterestRateModal = ({
  isOpen,
  onClose,
  accountIds,
}: IUpdateLoanMultipleInterestRateModalProps) => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const queryClient = useQueryClient();

  const methods = useForm();

  const {
    isOpen: isConfirmationOpen,
    onClose: onConfirmationClose,
    onToggle: onConfirmationToggle,
  } = useDisclosure();

  const updateCancelRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    methods.reset({ rate: null, effectiveDate: null, fileUploads: [], note: '' });
    onClose();
  };

  const { mutateAsync: updateMultipleInterestRate } = useUpdateLoanMultipleInterestRateMutation();

  const handleSaveInterestRate = () => {
    asyncToast({
      id: 'settings-loan-account-multiple-account-premium-update',
      msgs: {
        loading: 'Updating Account Premium',
        success: 'Account Premium Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['viewLoanProductWithAccount']);
        handleClose();
      },
      promise: updateMultipleInterestRate({
        accountId: accountIds,
        data: { ...methods.getValues() } as InterestRateSetupInput,
      }),
    });
  };

  return (
    <>
      <Modal
        title="Update Interest Rate"
        open={isOpen}
        onClose={handleClose}
        primaryButtonLabel="Update"
        primaryButtonHandler={onConfirmationToggle}
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
            <FormInput
              name="rate"
              type="number"
              label="New Account Premium"
              textAlign="right"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />

            <FormCBSDatePicker
              name="effectiveDate"
              label="Effective Date"
              minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
            />

            <GridItem colSpan={2}>
              <FormFileInput name="fileUploads" label="File Upload" size="md" />
            </GridItem>

            <GridItem colSpan={2}>
              <FormTextArea name="note" label="Note" rows={3} />
            </GridItem>
          </Grid>
        </FormProvider>
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        cancelRef={updateCancelRef}
        handleConfirm={handleSaveInterestRate}
        title="Update Account Premium"
        description="This action will update account premium for all selected accounts. Are you sure you want
          to continue?"
      />
    </>
  );
};
