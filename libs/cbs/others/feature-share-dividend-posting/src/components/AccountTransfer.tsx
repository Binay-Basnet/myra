import { FormSelect } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const AccountTransfer = () => {
  const { t } = useTranslation();

  return (
    <FormSection header={t['shareAccountTransfer']} subHeader={t['shareAccountTransferSubtitle']}>
      <FormSelect label={t['shareChooseAccount']} name="accountForShareDividends" />
    </FormSection>
  );
};
