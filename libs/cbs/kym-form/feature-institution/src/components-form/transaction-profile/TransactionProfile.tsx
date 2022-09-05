import { FormProvider, useForm } from 'react-hook-form';

import {
  FormFieldSearchTerm,
  KymInsInput,
  useGetInstitutionKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { FormSection, Grid, GridItem } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';
import { getOption } from '../../utils/getOptionsInstitution';

interface IProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
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
          setSection((prev) =>
            prev?.subSection !== kymSection.subSection ? kymSection : prev
          );
        }}
      >
        <FormSection id="kymInsTransactionProfile">
          <FormInput
            type="text"
            id="institutionTransactionProfile"
            name="natureOfTransaction"
            label={t['kymInsNatureofTransaction']}
            __placeholder={t['kymInsEnterNatureofTransaction']}
          />
          <FormInput
            id="institutionTransactionProfile"
            type="number"
            name="annualTurnover"
            label={t['kymInsAnnualTurnover']}
            textAlign={'right'}
            __placeholder="0.00"
          />
          <FormInput
            id="institutionTransactionProfile"
            type="number"
            name="initialDepositAmount"
            label={t['kymInsInitialDepositAmount']}
            textAlign={'right'}
            __placeholder="0.00"
          />
          <GridItem colSpan={3}>
            <Grid templateColumns="repeat(2, 1fr)">
              <FormRadioGroup
                name="expectedMonthlyTurnover"
                label={t['kymInsExpectedMonthlyTurnover']}
                options={getOption(monthlyTurnover)}
                orientation="vertical"
                gap={'s8'}
              />

              <FormRadioGroup
                name="expectedMonthlyTransaction"
                label={t['kymInsExpectedMonthlyTransaction']}
                options={getOption(monthlyTransaction)}
                orientation="vertical"
                gap={'s8'}
              />
            </Grid>
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
