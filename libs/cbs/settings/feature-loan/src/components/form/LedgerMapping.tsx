import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const LedgerMapping = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="loanProductLedgerMapping">
      <FormInput
        type="ledgerMapping.principal"
        name="ledgerMapping.principal"
        label={t['loanProductPrincipal']}
      />
      <FormInput
        type="text"
        name="ledgerMapping.interestAccuredDaily"
        label={t['loanProductInterestAccuredDaily']}
      />
      <FormInput
        type="text"
        name="ledgerMapping.interestIncome"
        label={t['loanProductInterestIncome']}
      />
    </FormSection>
  );
};
