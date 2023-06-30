import { FormSection } from '@myra-ui';

import { useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const BankAccountDetails = () => {
  const { t } = useTranslation();
  const { data: bankList } = useGetBankListQuery();

  // const methods = useForm<CoopUnionInstitutionInformationInput>();

  // useCoopUnionInstitution({ methods });

  return (
    <FormSection id="kymCoopUnionAccBankAccountDetails" header="kymCoopUnionBankAccountDetails">
      <FormSelect
        isRequired
        name="nameOfBank"
        label={t['kymCoopUnionNameOfBank']}
        options={bankList?.bank?.bank?.list?.map((bank) => ({
          label: bank?.name,
          value: bank?.id,
        }))}
      />
      <FormInput
        isRequired
        type="text"
        name="accountNumber"
        label={t['kymCoopUnionAccountNumber']}
      />

      <FormInput isRequired type="text" name="accountName" label={t['kymCoopUnionAccountName']} />
    </FormSection>
  );
};
