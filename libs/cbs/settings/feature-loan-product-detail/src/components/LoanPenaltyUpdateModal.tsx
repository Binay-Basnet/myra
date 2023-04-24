import { useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import NepaliDate from 'nepali-date-converter';

import { Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  DateType,
  PenaltyType,
  ProductPenaltyData,
  store,
  useGetEndOfDayDateDataQuery,
} from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormDatePicker,
  FormFileInput,
  FormNumberInput,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface ILoanPenaltyUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onEdit?: () => void;
  methods: UseFormReturn;
  penalty?: ProductPenaltyData | null;
  rateLabel?: string;
}

export const LoanPenaltyUpdateModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  methods,
  penalty,
}: ILoanPenaltyUpdateModalProps) => {
  const { t } = useTranslation();

  const dateType = store.getState().auth?.preference?.date || DateType.Ad;
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  useEffect(() => {
    if (penalty) {
      methods.reset({
        payload: {
          penaltyType: penalty?.payload?.penaltyType,
          dayAfterInstallmentDate: penalty?.payload?.dayAfterInstallmentDate,
          penaltyRate: penalty?.payload?.penaltyRate,
          penaltyAmount: penalty?.payload?.penaltyAmount,
        },
        additionalData: {
          effectiveDate: penalty?.additionalData?.effectiveDate,
          fileUploads: penalty?.additionalData?.fileUploads,
          notes: penalty?.additionalData?.notes,
        },
      });
    }
  }, [penalty]);

  const handleClose = () => {
    methods.reset({
      payload: {
        penaltyType: PenaltyType.RemainingPrincipal,
        dayAfterInstallmentDate: null,
        penaltyRate: null,
        penaltyAmount: null,
      },
      additionalData: { effectiveDate: null, fileUploads: [], notes: '' },
    });
    onClose();
  };

  const penaltyList = [
    {
      label: t['loanProductRemainingPrincipal'],
      value: PenaltyType.RemainingPrincipal,
    },
    {
      label: t['loanProductPenalInterest'],
      value: PenaltyType.PenalInterest,
    },
  ];

  return (
    <Modal
      title="Update Penalty"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Apply"
      primaryButtonHandler={penalty ? onEdit : onSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
            <Text>{t['loanProductPenaltyOn']} </Text>
            <FormSwitchTab
              name="payload.penaltyType"
              options={penaltyList}
              defaultValue={PenaltyType.RemainingPrincipal}
            />
          </GridItem>

          <FormNumberInput
            name="payload.dayAfterInstallmentDate"
            label="Day after installment date"
          />

          <FormNumberInput
            name="payload.penaltyRate"
            label="Penalty"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />

          <FormAmountInput type="number" name="payload.penaltyAmount" label="Penalty Amount" />

          <FormDatePicker
            name="additionalData.effectiveDate"
            label="Effective Date"
            minDate={
              closingDate?.local
                ? dateType === 'BS'
                  ? new NepaliDate(closingDate?.np ?? '').toJsDate()
                  : new Date(closingDate?.en ?? '')
                : new Date()
            }
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
