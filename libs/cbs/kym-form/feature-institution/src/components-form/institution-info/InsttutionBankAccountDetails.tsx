import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput, useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
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

  const { data: BankList } = useGetBankListQuery();

  type optionType = { label: string; value: string };

  const Options = BankList?.bank?.bank?.list?.reduce((prevVal, curVal) => {
    return [...prevVal, { label: curVal?.name, value: curVal?.id }];
  }, [] as optionType[]);

  useInstitution({ methods });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection
          id="kymInsBankAccountDetails"
          header="kymInsBankAccountDetails"
        >
          <FormSelect
            name="bank"
            label={t['kymInsNameofBank']}
            placeholder={t['kymInsSelectBank']}
            options={Options}
          />
          <FormInput
            type="text"
            name="accountNumber"
            label={t['kymInsAccountNumber']}
            placeholder={t['kymInsEnterAccountNumber']}
          />

          <FormInput
            type="text"
            name="accountName"
            label={t['kymInsAccountName']}
            placeholder={t['kymInsEnterAccountName']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
