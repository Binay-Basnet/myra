import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput, useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BankAccountDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const { data: bankList } = useGetBankListQuery();

  useInstitution({ methods });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymInsBankAccountDetails" header="kymInsBankAccountDetails">
          <FormSelect
            name="bank"
            label={t['kymInsNameofBank']}
            options={bankList?.bank?.bank?.list?.map((bank) => ({
              label: String(bank?.name),
              value: String(bank?.id),
            }))}
          />
          <FormInput type="text" name="accountNumber" label={t['kymInsAccountNumber']} />

          <FormInput type="text" name="accountName" label={t['kymInsAccountName']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
