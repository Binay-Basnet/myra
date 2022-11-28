import { FormSelect } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const BookPayables = () => {
  const { t } = useTranslation();

  return (
    <FormSection header={t['shareBookPayables']} subHeader={t['shareBookPayablesSubtitle']}>
      <FormSelect name="organizationFundForDividends" label="Ledger Account" />
    </FormSection>
  );
};
