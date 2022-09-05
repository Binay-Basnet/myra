import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  useGetBankListQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IBankAccountDetailsProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const BankAccountDetails = ({
  setSection,
}: IBankAccountDetailsProps) => {
  const { t } = useTranslation();
  const { data: bankList } = useGetBankListQuery();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection((prev) =>
            prev?.subSection !== kymSection.subSection ? kymSection : prev
          );
        }}
      >
        <FormSection
          id="kymCoopUnionAccBankAccountDetails"
          header="kymCoopUnionBankAccountDetails"
        >
          <FormSelect
            name="nameOfBank"
            label={t['kymCoopUnionNameOfBank']}
            options={bankList?.bank?.bank?.list?.map((bank) => ({
              label: bank?.name,
              value: bank?.id,
            }))}
          />
          <FormInput
            type="text"
            name="accountNumber"
            label={t['kymCoopUnionAccountNumber']}
          />

          <FormInput
            type="text"
            name="accountName"
            label={t['kymCoopUnionAccountName']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
