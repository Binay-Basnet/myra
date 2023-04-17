import { useEffect } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Alert, Grid, GridItem, Modal, Text } from '@myra-ui';

import { InterestRateSetup, useAccountDetails } from '@coop/cbs/data-access';
import { CustomInterestRateSetupInput } from '@coop/cbs/utils';
import { FormDatePicker, FormFileInput, FormInput, FormTextArea } from '@coop/shared/form';

interface IAccountInterestUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onEdit?: () => void;
  methods: UseFormReturn<CustomInterestRateSetupInput>;
  rate?: InterestRateSetup | null | undefined;
}

export const AccountInterestUpdateModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  methods,
  rate,
}: IAccountInterestUpdateModalProps) => {
  const { accountDetails } = useAccountDetails();

  const rateDiff = methods.watch('rate');

  useEffect(() => {
    if (rate) {
      methods.reset({
        rate: Number(rate.rate) - Number(accountDetails?.interestRate),
        effectiveDate: rate.effectiveDate,
        fileUploads: rate.fileUploads as unknown as string[],
        note: rate.note,
      });
    }
  }, [rate]);

  const handleClose = () => {
    methods.reset({ rate: null, effectiveDate: null, fileUploads: [], note: '' });
    onClose();
  };

  return (
    <Modal
      title="Update Rate"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Apply"
      primaryButtonHandler={rate ? onEdit : onSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <FormInput
            name="rate"
            type="number"
            label="Update Account Premium By"
            textAlign="right"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />

          <FormDatePicker name="effectiveDate" label="Effective Date" minTransactionDate />

          {rateDiff && (
            <GridItem colSpan={2}>
              <Alert
                status="info"
                title={`New Account Premium is ${
                  Number(rateDiff) + Number(accountDetails?.interestRate ?? 0)
                } %`}
                hideCloseIcon
              />
            </GridItem>
          )}

          <GridItem colSpan={2}>
            <FormFileInput name="fileUploads" label="File Upload" size="md" />
          </GridItem>

          <GridItem colSpan={2}>
            <FormTextArea name="note" label="Note" rows={3} />
          </GridItem>
        </Grid>
      </FormProvider>
    </Modal>
  );
};
