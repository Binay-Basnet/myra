import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymInsInput } from '@coop/shared/data-access';
import {
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/institutionHook';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const BankAccountDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

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
              options={[
                { label: 'NIC AISA BANK ', value: 'NICA' },
                { label: 'JYOTI BIKAS BANK LIMITED', value: 'JBBL' },
                { label: 'NIBL BANK ', value: 'NIBL' },
              ]}
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
