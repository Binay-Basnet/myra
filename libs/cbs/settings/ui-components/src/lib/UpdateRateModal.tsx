import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Grid, GridItem, Modal, Text } from '@myra-ui';

import { InterestRateSetup, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import { CustomInterestRateSetupInput } from '@coop/cbs/utils';
import { FormDatePicker, FormFileInput, FormInput, FormTextArea } from '@coop/shared/form';

interface IUpdateRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onEdit?: () => void;
  isConfirmationModalOpen: boolean;
  setIsConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirmationModalClose: () => void;
  type?: string;
  methods: UseFormReturn<CustomInterestRateSetupInput>;
  rate?: InterestRateSetup | null | undefined;
  rateLabel?: string;
}

export const UpdateRateModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  isConfirmationModalOpen,
  setIsConfirmationModalOpen,
  handleConfirmationModalClose,
  type,
  methods,
  rate,
  rateLabel,
}: IUpdateRateModalProps) => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  useEffect(() => {
    if (rate) {
      methods.reset({
        rate: rate.rate,
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
    <>
      <Modal
        title="Update Rate"
        open={isOpen}
        onClose={handleClose}
        primaryButtonLabel="Apply"
        primaryButtonHandler={() => setIsConfirmationModalOpen(true)}
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
            <FormInput
              name="rate"
              type="number"
              label={rateLabel ?? 'New Product Premium'}
              textAlign="right"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />

            <FormDatePicker
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
      <Modal
        open={isConfirmationModalOpen}
        onClose={handleConfirmationModalClose}
        primaryButtonLabel="OK"
        primaryButtonHandler={rate ? onEdit : onSave}
        secondaryButtonLabel="Cancel"
        secondaryButtonHandler={() => setIsConfirmationModalOpen(false)}
      >
        <Text fontSize="r1">
          {type
            ? `This action will update organization rate for ${type} . Are you sure you want to continue?`
            : 'Are you sure you want to continue?'}
        </Text>
      </Modal>
    </>
  );
};
