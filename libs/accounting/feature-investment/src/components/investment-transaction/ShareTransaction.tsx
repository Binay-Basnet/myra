import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { ShareInvestmentType } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormDatePicker,
  FormNumberInput,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

const shareTypeOptions = [
  { label: 'Share Bonus / Dividend', value: ShareInvestmentType.ShareBonusDividend },
  { label: 'Share Return', value: ShareInvestmentType.ShareReturn },
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
          <FormAmountInput name="share.bonusAmount" label="Bonus Amount" />

          <FormAmountInput name="share.dividendAmount" label="Dividend Amount" />

          <FormNumberInput name="share.shareQuantity" label="Share Quantity" />

          <FormAmountInput name="share.totalAmount" label="Total Amount" />
        </>
      )}

      {shareType === ShareInvestmentType.ShareReturn && (
        <>
          <FormNumberInput name="share.shareReturnKitta" label="Share Return Kitta" />

          <FormNumberInput name="share.sharePerKitta" label="Share Per Kitta" />

          <FormAmountInput
            type="number"
            name="share.totalShareReturnAmount"
            label="Total Share Return Amount"
          />
        </>
      )}

      <GridItem colSpan={3}>
        <FormTextArea name="share.notes" label="Notes" rows={3} />
      </GridItem>
    </FormSection>
  );
};
