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
import { Box, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const BankAccountDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        // console.log(editValues);
        // if (editValues && data) {
        mutate({ id: router.query['id'] as string, data });
        //   refetch();
        // }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        // onChange={debounce(() => {
        //   console.log('hello', getValues());
        //   mutate({ id, data: getValues() });
        // }, 800)}
        // onSubmit={handleSubmit((data) => {
        //   console.log('data', data);
        // })}
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
