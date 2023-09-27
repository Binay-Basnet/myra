import { useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  ProductChargeAdditionalDataInput,
  ProductRebateData,
  RebateTypeInput,
  Scalars,
  useGetEndOfDayDateDataQuery,
} from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormDatePicker,
  FormFileInput,
  FormNumberInput,
  FormTextArea,
} from '@coop/shared/form';

type LoanProductRebateUpdateInput = {
  payload: RebateTypeInput;
  additionalData: Omit<ProductChargeAdditionalDataInput, 'effectiveDate'> & {
    effectiveDate: Scalars['Localized'] | null;
  };
};

interface IRebateUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onEdit?: () => void;
  methods: UseFormReturn<LoanProductRebateUpdateInput, any>;
  rebate?: ProductRebateData | null;
  rateLabel?: string;
}

export const RebateUpdateModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  methods,
  rebate,
}: IRebateUpdateModalProps) => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  useEffect(() => {
    if (rebate) {
      methods.reset({
        payload: {
          dayBeforeInstallmentDate: rebate?.payload?.dayBeforeInstallmentDate,
          rebateRate: rebate?.payload?.rebateRate,
          rebateAmount: rebate?.payload?.rebateAmount,
        },
        additionalData: {
          effectiveDate: rebate?.additionalData?.effectiveDate,
          fileUploads: rebate?.additionalData?.fileUploads as unknown as string[],
          notes: rebate?.additionalData?.notes,
        },
      });
    }
  }, [rebate]);

  const handleClose = () => {
    methods.reset({
      payload: {
        dayBeforeInstallmentDate: null,
        rebateRate: null,
        rebateAmount: null,
      },
      additionalData: { effectiveDate: null, fileUploads: [], notes: '' },
    });
    onClose();
  };

  return (
    <Modal
      title="Update Rebate"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Apply"
      primaryButtonHandler={rebate ? onEdit : onSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <FormNumberInput
            name="payload.dayBeforeInstallmentDate"
            label="Day before installment date"
          />

          <FormNumberInput
            name="payload.rebateRate"
            label="Rebate Rate"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />

          <FormAmountInput type="number" name="payload.rebateAmount" label="Rebate Amount" />

          <FormDatePicker
            name="additionalData.effectiveDate"
            label="Effective Date"
            minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
          />

          <GridItem colSpan={2}>
            <FormFileInput name="additionalData.fileUploads" label="File Upload" size="md" />
          </GridItem>

          <GridItem colSpan={2}>
            <FormTextArea name="additionalData.notes" label="Note" rows={3} />
          </GridItem>
        </Grid>
      </FormProvider>
    </Modal>
  );
};
