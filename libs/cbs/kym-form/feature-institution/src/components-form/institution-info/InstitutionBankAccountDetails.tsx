import { FormSection } from '@myra-ui';

import { useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const BankAccountDetailsInstitution = () => {
  const { t } = useTranslation();

  const { data: bankList } = useGetBankListQuery();

  return (
    <FormSection id="kymInsBankAccountDetails" header="kymInsBankAccountDetails">
      <FormSelect
        isRequired
        name="bank"
        label={t['kymInsNameofBank']}
        options={bankList?.bank?.bank?.list?.map((bank) => ({
          label: String(bank?.name),
          value: String(bank?.id),
        }))}
      />
      <FormInput isRequired type="text" name="accountNumber" label={t['kymInsAccountNumber']} />

      <FormInput isRequired type="text" name="accountName" label={t['kymInsAccountName']} />
    </FormSection>
  );
};
