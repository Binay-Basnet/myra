import { useFormContext } from 'react-hook-form';

import { LoanInterestMethod, LoanRepaymentScheme } from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const LoanRepaymentSchemes = () => {
  const { watch } = useFormContext();
  const interestMethod = watch('interestMethod');
  const { t } = useTranslation();

  const loanschemeOptionsI = [{ label: t['loanProductEMI'], value: LoanRepaymentScheme.Emi }];

  const loanschemeOptionsII = [
    { label: t['loanProductEPI'], value: LoanRepaymentScheme.Epi },
    { label: t['loanProductEMI'], value: LoanRepaymentScheme.Emi },
    { label: t['loanProductFlat'], value: LoanRepaymentScheme.Flat },
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
          name="interestMethod"
          label={t['loanProductInterestMethod']}
          options={interestMethodtList}
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
