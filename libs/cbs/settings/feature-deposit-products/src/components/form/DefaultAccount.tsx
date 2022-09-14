import { FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const DefaultAccountName = () => {
  const { t } = useTranslation();
  return (
    <FormSection
      header="depositProductDefaultAmountDepositAccountName"
      subHeader="depositProductDefaultDepositSubHeader"
    >
      <FormSelect name="accountType" label={t['depositProductAccountType']} />
    </FormSection>
  );
};
