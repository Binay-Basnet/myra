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
import { FormRadioGroup } from '@coop/shared/form';
import { FormInput, FormSelect } from '@coop/shared/form';
// import { InstitutionExpectedMonthlyTurnover } from '@coop/shared/data-access';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

const radioList1 = [
  'Less than 20 Lakhs',
  'Less than 50 Lakhs',
  'Above 50 Lakhs',
];

const radioList2 = ['Less than 10', 'Less than 25', 'Above 25'];

export const TransactionProfileInstitution = (props: IProps) => {
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
        <GroupContainer>
          <>
            {/* {console.log('hello world', InstitutionExpectedMonthlyTurnover)} */}

            <InputGroupContainer
              id="kymInsTransactionProfile"
              scrollMarginTop={'200px'}
            >
              <FormInput
                // control={control}
                type="text"
                name="natureOfTransaction"
                label={t['kymInsNatureofTransaction']}
                placeholder={t['kymInsEnterNatureofTransaction']}
              />
              <FormInput
                type="number"
                name="annualTurnover"
                label={t['kymInsAnnualTurnover']}
                textAlign={'right'}
                placeholder="0.00"
              />

              <FormInput
                type="number"
                name="initialDepositAmount"
                label={t['kymInsInitialDepositAmount']}
                textAlign={'right'}
                placeholder="0.00"
              />
            </InputGroupContainer>
            <Grid templateColumns="repeat(2, 1fr)">
              <Box
                mt="s16"
                id="Expected Monthly Turnover"
                scrollMarginTop={'200px'}
              >
                <FormRadioGroup
                  name="expectedMonthlyTurnover"
                  label={t['kymInsExpectedMonthlyTurnover']}
                  radioList={radioList1}
                  orientation="vertical"
                  gap={'s8'}
                />
              </Box>

              <Box
                mt="s16"
                id="Expected Monthly Transaction"
                scrollMarginTop={'200px'}
              >
                <FormRadioGroup
                  name="expectedMonthlyTransaction"
                  label={t['kymInsExpectedMonthlyTransaction']}
                  radioList={radioList2}
                  orientation="vertical"
                  gap={'s8'}
                />
              </Box>
            </Grid>
          </>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
