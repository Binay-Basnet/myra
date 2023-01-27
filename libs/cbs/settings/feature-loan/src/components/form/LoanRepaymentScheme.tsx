import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, GridItem, Text } from '@myra-ui';

import { LoanInterestMethod, LoanRepaymentScheme } from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const LoanRepaymentSchemes = () => {
  const router = useRouter();

  const { watch } = useFormContext();
  const interestMethod = watch('interestMethod');
  const { t } = useTranslation();

  const loanschemeOptionsI = [
    {
      label: t['loanProductEMI'],
      value: LoanRepaymentScheme.Emi,
      isDisabled: router?.asPath?.includes('/edit'),
    },
  ];

  const loanschemeOptionsII = [
    {
      label: t['loanProductEPI'],
      value: LoanRepaymentScheme.Epi,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['loanProductEMI'],
      value: LoanRepaymentScheme.Emi,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['loanProductFlat'],
      value: LoanRepaymentScheme.Flat,
      isDisabled: router?.asPath?.includes('/edit'),
    },
  ];

  const interestMethodtList = [
    {
      label: t['loanProductDiminishing'],
      value: LoanInterestMethod.Diminishing,
    },
    { label: t['loanProductStraight'], value: LoanInterestMethod.Straight },
  ];

  return (
    <FormSection>
      <GridItem colSpan={1}>
        <FormSelect
          isRequired
          name="interestMethod"
          label={t['loanProductInterestMethod']}
          options={interestMethodtList}
          isDisabled={router?.asPath?.includes('/edit')}
        />
      </GridItem>

      {(interestMethod === LoanInterestMethod.Straight ||
        interestMethod === LoanInterestMethod.Diminishing) && (
        <GridItem colSpan={3}>
          <Text mb="s16" fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
            {t['loanProductLoanRepaymentScheme']}
          </Text>

          {interestMethod === LoanInterestMethod.Straight && (
            <FormCheckboxGroup
              orientation="column"
              name="repaymentScheme"
              list={loanschemeOptionsI}
            />
          )}

          {interestMethod === LoanInterestMethod.Diminishing && (
            <FormCheckboxGroup
              orientation="column"
              name="repaymentScheme"
              list={loanschemeOptionsII}
            />
          )}
        </GridItem>
      )}
    </FormSection>
  );
};
