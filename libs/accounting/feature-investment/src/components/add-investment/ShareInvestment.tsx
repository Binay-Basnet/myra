import {
  FormAmountInput,
  FormInput,
  FormLocalDatePicker,
  FormNumberInput,
  FormTextArea,
} from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';

export const ShareInvestment = () => (
  <FormSection header="Share">
    <FormNumberInput name="share.count" label="Purchase Share Count" />

    <FormNumberInput name="share.rate" label="Rate Per Share" />

    <FormAmountInput name="share.purchaseAmount" label="Total Purchase Amount" />

    <FormInput name="share.certificateNo" label="Share Certificate Number" />

    <FormLocalDatePicker name="share.date" label="Purchase Date" />

    <GridItem colSpan={3}>
      <FormTextArea name="share.notes" label="Notes" rows={3} />
    </GridItem>
  </FormSection>
);
