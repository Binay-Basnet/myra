import { FormProvider, useForm } from 'react-hook-form';

import { CoopUnionInstitutionInformationInput, useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { useCoopUnionInstitution } from '../../../hooks/useCoopUnionInstitution';

interface IBankAccountDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BankAccountDetails = ({ setSection }: IBankAccountDetailsProps) => {
  const { t } = useTranslation();
  const { data: bankList } = useGetBankListQuery();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCoopUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <FormSection id="kymCoopUnionAccBankAccountDetails" header="kymCoopUnionBankAccountDetails">
          <FormSelect
            name="nameOfBank"
            label={t['kymCoopUnionNameOfBank']}
            options={bankList?.bank?.bank?.list?.map((bank) => ({
              label: bank?.name,
              value: bank?.id,
            }))}
          />
          <FormInput type="text" name="accountNumber" label={t['kymCoopUnionAccountNumber']} />

          <FormInput type="text" name="accountName" label={t['kymCoopUnionAccountName']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
