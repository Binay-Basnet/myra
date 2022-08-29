import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  useGetBankListQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IBankAccountDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BankAccountDetails = ({
  setSection,
}: IBankAccountDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  const { sectionStatus } = useCooperativeUnionInstitution({ methods });
  const sectionErrors = sectionStatus?.errors?.[0]?.errors;

  const { data: bankList } = useGetBankListQuery();

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <FormSection
          id="kymCoopUnionAccBankAccountDetails"
          header="kymCoopUnionBankAccountDetails"
        >
          <FormSelect
            name="nameOfBank"
            label={t['kymCoopUnionNameOfBank']}
            placeholder={t['kymCoopUnionSelectBank']}
            options={bankList?.bank?.bank?.list?.map((bank) => ({
              label: bank?.name,
              value: bank?.id,
            }))}
            errorText={
              sectionErrors?.['nameOfBank'] && sectionErrors['nameOfBank'][0]
            }
          />
          <FormInput
            type="text"
            name="accountNumber"
            label={t['kymCoopUnionAccountNumber']}
            placeholder={t['kymCoopUnionEnterAccountNumber']}
            errorText={
              sectionErrors?.['accountNumber'] &&
              sectionErrors['accountNumber'][0]
            }
          />

          <FormInput
            type="text"
            name="accountName"
            label={t['kymCoopUnionAccountName']}
            placeholder={t['kymCoopUnionEnterAccountName']}
            errorText={
              sectionErrors?.['accountName'] && sectionErrors['accountName'][0]
            }
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
