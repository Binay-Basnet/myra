import { FormSection } from '@myra-ui';

import { useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

export const KYMBankDetails = () => {
  const { data } = useGetBankListQuery();

  const bankList =
    data &&
    data?.bank?.bank?.list?.map((item) => ({
      label: item?.name as string,
      value: item?.id as string,
    }));

  return (
    <FormSection id="kymAccIndFinancialTransactionDetails" header="Bank Details" subHeader="">
      <FormSelect name="bankId" label="Bank" options={bankList} />
      <FormInput name="bankAccountId" label="Account Number" />
    </FormSection>
  );
};
