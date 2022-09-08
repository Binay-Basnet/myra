import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const LedgerMapping = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="loanProductLedgerMapping">
      <FormInput
        type="text"
        name="principal"
        label={t['loanProductPrincipal']}
      />
      <FormInput
        type="text"
        name="interestAccuredDaily"
        label={t['loanProductInterestAccuredDaily']}
      />
      <FormInput
        type="text"
        name="interestIncome"
        label={t['loanProductInterestIncome']}
      />
    </FormSection>
  );
};
