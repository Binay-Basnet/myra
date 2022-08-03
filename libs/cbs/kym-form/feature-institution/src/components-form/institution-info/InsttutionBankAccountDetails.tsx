import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymInsInput, useGetBankListQuery } from '@coop/shared/data-access';
import {
  GetBankListQuery,
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
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

  console.log({ BankList });

  type optionType = { label: string; value: string };

  const Options = BankList?.bank?.bank?.list?.reduce((prevVal, curVal) => {
    return [...prevVal, { label: curVal?.name, value: curVal?.id }];
  }, [] as optionType[]);

  const { control, handleSubmit, getValues, watch, setError } = methods;
  useInstitution({ methods });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer id="kymInsBankAccountDetails" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsBankAccountDetails']}
          </Text>
          <InputGroupContainer>
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
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
