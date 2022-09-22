import { DefaultAccountType } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const DefaultAccountName = () => {
  const { t } = useTranslation();

  const accountTypeList = [
    { label: t['depositProductSaving'], value: DefaultAccountType?.Saving },
    { label: t['depositProductCurrent'], value: DefaultAccountType?.Current },
  ];
  return (
    <FormSection
      header="depositProductDefaultAmountDepositAccountName"
      subHeader="depositProductDefaultDepositSubHeader"
    >
      <FormSelect
        name="accountType"
        options={accountTypeList}
        label={t['depositProductAccountType']}
      />
    </FormSection>
  );
};
