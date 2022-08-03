import { FormProvider, useForm } from 'react-hook-form';

import {
  FormFieldSearchTerm,
  KymInsInput,
  useGetInstitutionKymOptionsQuery,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, Grid } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';
import { getOption } from '../../utils/getOptionsInstitution';

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
  const { data: monthlyTransaction, isLoading: monthlyTransactionLoading } =
    useGetInstitutionKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.ExpectedMonthlyTransaction,
    });
  const { data: monthlyTurnover, isLoading: monthlyTurnoverLoading } =
    useGetInstitutionKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.ExpectedMonthlyTurnover,
    });
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
        <GroupContainer>
          <>
            <InputGroupContainer
              id="kymInsTransactionProfile"
              scrollMarginTop={'200px'}
            >
              <FormInput
                type="text"
                id="institutionTransactionProfile"
                name="natureOfTransaction"
                label={t['kymInsNatureofTransaction']}
                placeholder={t['kymInsEnterNatureofTransaction']}
              />
              <FormInput
                id="institutionTransactionProfile"
                type="number"
                name="annualTurnover"
                label={t['kymInsAnnualTurnover']}
                textAlign={'right'}
                placeholder="0.00"
              />

              <FormInput
                id="institutionTransactionProfile"
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
                  options={getOption(monthlyTurnover)}
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
                  options={getOption(monthlyTransaction)}
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
