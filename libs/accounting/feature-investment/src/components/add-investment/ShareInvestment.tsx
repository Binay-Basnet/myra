import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormAmountInput,
  FormInput,
  FormLocalDatePicker,
  FormNumberInput,
  FormTextArea,
} from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';

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

      <FormAmountInput name="share.purchaseAmount" label="Total Purchase Amount" isDisabled />

      <FormInput name="share.certificateNo" label="Share Certificate Number" />

      <FormLocalDatePicker name="share.date" label="Purchase Date" />

      <GridItem colSpan={3}>
        <FormTextArea name="share.notes" label="Notes" rows={3} />
      </GridItem>
    </FormSection>
  );
};
