import { FormSection } from '@myra-ui';

import { InvItemsValuationMethod } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

export const AdditionalInformationInventoryItems = () => {
  const itemOptions = [
    {
      label: 'First In First Out',
      value: InvItemsValuationMethod?.Fifo,
    },
  ];

  return (
    <FormSection header="Additional Information" divider={false}>
      <FormInput name="reorderLevel" label="Reorder Level" />
      <FormSelect name="valuationMethod" label="Valuation Method" options={itemOptions} />
    </FormSection>
  );
};
