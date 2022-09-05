import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput, useGetBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
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
          setSection((prev) =>
            prev?.subSection !== kymSection.subSection ? kymSection : prev
          );
        }}
      >
        <FormSection
          id="kymInsBankAccountDetails"
          header="kymInsBankAccountDetails"
        >
          <FormSelect
            name="bank"
            label={t['kymInsNameofBank']}
            __placeholder={t['kymInsSelectBank']}
            options={Options}
          />
          <FormInput
            type="text"
            name="accountNumber"
            label={t['kymInsAccountNumber']}
            __placeholder={t['kymInsEnterAccountNumber']}
          />

          <FormInput
            type="text"
            name="accountName"
            label={t['kymInsAccountName']}
            __placeholder={t['kymInsEnterAccountName']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
