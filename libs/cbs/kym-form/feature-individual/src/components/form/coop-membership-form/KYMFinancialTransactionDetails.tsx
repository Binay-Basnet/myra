import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KYMFinancialTransactionDetails = () => {
  const { t } = useTranslation();

  return (
    <FormSection
      id="kymAccIndFinancialTransactionDetails"
      header="kymIndFinancialTransactionDetails"
      subHeader="kymIndDetailsoftheamount"
    >
      <FormAmountInput name="initialShare" label={t['kymIndFinancialShare']} />
      <FormAmountInput name="initialSaving" label={t['kymIndFinancialSavings']} />

      <FormAmountInput name="initialLoan" label={t['kymIndFinancialLoan']} />

      <FormAmountInput
        type="number"
        name="otherFinancialAmount"
        label={t['kymIndFinancialOther']}
      />
    </FormSection>
  );
};
