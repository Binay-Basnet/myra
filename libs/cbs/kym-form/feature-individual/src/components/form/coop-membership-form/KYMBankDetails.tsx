import { FormSection } from '@myra-ui';

import { useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KYMBankDetails = () => {
  const { t } = useTranslation();
  const { data } = useGetBankListQuery();

  const bankList =
    data &&
    data?.bank?.bank?.list?.map((item) => ({
      label: item?.name as string,
      value: item?.id as string,
    }));

  return (
    <FormSection id="kymAccIndFinancialTransactionDetails" header={t['kymIndbankDetails']}>
      <FormSelect name="bankId" label={t['kymIndbankDetailsBank']} options={bankList} />
      <FormInput name="bankAccountId" label={t['kymIndbankDetailsAccountNumber']} />
    </FormSection>
  );
};
