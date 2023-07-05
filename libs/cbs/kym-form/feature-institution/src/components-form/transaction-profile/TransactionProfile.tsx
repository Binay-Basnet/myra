import { FormSection, Grid, GridItem } from '@myra-ui';

import { FormFieldSearchTerm, useGetInstitutionKymOptionsQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getOption } from '../../utils/getOptionsInstitution';

export const TransactionProfileInstitution = () => {
  const { t } = useTranslation();

  const { data: monthlyTransaction } = useGetInstitutionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.ExpectedMonthlyTransaction,
  });
  const { data: monthlyTurnover } = useGetInstitutionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.ExpectedMonthlyTurnover,
  });

  return (
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
  );
};
