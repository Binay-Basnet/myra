import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { ShareInvestmentType } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormBankSelect,
  FormDatePicker,
  FormNumberInput,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

const shareTypeOptions = [
  { label: 'Share Bonus / Dividend', value: ShareInvestmentType.ShareBonusDividend },
  { label: 'Share Return', value: ShareInvestmentType.ShareReturn },
  { label: 'Share Purchase', value: ShareInvestmentType.SharePurchase },
];

export const ShareTransaction = () => {
  const { watch } = useFormContext();

  const shareType = watch('share.type');

  return (
    <FormSection header="Share">
      <GridItem colSpan={2}>
        <FormSelect name="share.type" label="Type" options={shareTypeOptions} />
      </GridItem>

      <FormDatePicker name="share.date" label="Date" />

      {shareType === ShareInvestmentType.ShareBonusDividend && (
        <>
          <FormNumberInput name="share.count" label="Bonus Count" />

          <FormNumberInput name="share.rate" label="Share Per Kitta" />

          <FormAmountInput type="number" name="share.totalAmount" label="Total Amount" />
        </>
      )}

      {shareType === ShareInvestmentType.ShareReturn && (
        <>
          <FormNumberInput name="share.count" label="Share Return Kitta" />

          <FormNumberInput name="share.rate" label="Share Per Kitta" />

          <FormAmountInput
            type="number"
            name="share.totalAmount"
            label="Total Share Return Amount"
          />
        </>
      )}

      {shareType === ShareInvestmentType.SharePurchase && (
        <>
          <FormNumberInput name="share.count" label="Share Purchase Kitta" />

          <FormNumberInput name="share.rate" label="Share Per Kitta" />

          <FormAmountInput
            type="number"
            name="share.totalAmount"
            label="Total Share Purchase Amount"
          />
        </>
      )}

      <FormBankSelect name="bankId" label="Bank" />

      <GridItem colSpan={3}>
        <FormTextArea name="notes" label="Notes" rows={3} />
      </GridItem>
    </FormSection>
  );
};
