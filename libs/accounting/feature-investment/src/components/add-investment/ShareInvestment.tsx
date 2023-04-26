import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import {
  FormAmountInput,
  FormBankSelect,
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormTextArea,
} from '@coop/shared/form';

export const ShareInvestment = () => {
  const methods = useFormContext();

  const { watch, setValue } = methods;

  const shareCount = watch('share.count');
  const shareRate = watch('share.rate');

  useEffect(() => {
    setValue('share.purchaseAmount', Number(shareCount ?? 0) * Number(shareRate ?? 0));
  }, [shareCount, shareRate]);

  return (
    <FormSection header="Share">
      <FormNumberInput name="share.count" label="Purchase Share Count" />

      <FormNumberInput name="share.rate" label="Rate Per Share" />

      <FormAmountInput
        type="number"
        name="share.purchaseAmount"
        label="Total Purchase Amount"
        isDisabled
      />

      <FormInput name="share.certificateNo" label="Share Certificate Number" />

      <FormDatePicker name="share.date" label="Purchase Date" />

      <FormBankSelect name="bankId" label="Bank" />

      <GridItem colSpan={3}>
        <FormTextArea name="share.notes" label="Notes" rows={3} />
      </GridItem>
    </FormSection>
  );
};
