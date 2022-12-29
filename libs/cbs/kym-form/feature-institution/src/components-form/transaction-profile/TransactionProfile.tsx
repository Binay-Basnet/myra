import { FormProvider, useForm } from 'react-hook-form';

import { FormSection, Grid, GridItem } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymInsInput,
  useGetInstitutionKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormAmountInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';
import { getOption } from '../../utils/getOptionsInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const TransactionProfileInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;
  const { data: monthlyTransaction } = useGetInstitutionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.ExpectedMonthlyTransaction,
  });
  const { data: monthlyTurnover } = useGetInstitutionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.ExpectedMonthlyTurnover,
  });

  useInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymInsTransactionProfile">
          <FormInput
            type="text"
            id="institutionTransactionProfile"
            name="natureOfTransaction"
            label={t['kymInsNatureofTransaction']}
          />
          <FormInput
            id="institutionTransactionProfile"
            type="number"
            name="annualTurnover"
            label={t['kymInsAnnualTurnover']}
            textAlign="right"
          />
          <FormAmountInput
            id="institutionTransactionProfile"
            name="initialDepositAmount"
            label={t['kymInsInitialDepositAmount']}
          />
          <GridItem colSpan={3}>
            <Grid templateColumns="repeat(2, 1fr)">
              <FormRadioGroup
                isRequired
                name="expectedMonthlyTurnover"
                label={t['kymInsExpectedMonthlyTurnover']}
                options={getOption(monthlyTurnover)}
                orientation="vertical"
                gap="s8"
              />

              <FormRadioGroup
                isRequired
                name="expectedMonthlyTransaction"
                label={t['kymInsExpectedMonthlyTransaction']}
                options={getOption(monthlyTransaction)}
                orientation="vertical"
                gap="s8"
              />
            </Grid>
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
