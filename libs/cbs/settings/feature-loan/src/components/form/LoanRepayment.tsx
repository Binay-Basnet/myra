import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const LoanRepayment = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const method = useFormContext();
  const { watch } = method;
  const principalMaxGraceNumber = watch('principalMaxGraceNumber');

  return (
    <FormSection header="loanProductLoanRepaymentStartGraceDuration">
      <FormInput
        name="principalMaxGraceNumber"
        textAlign="right"
        label={t['loanProductMaxInstallmentPrincipal']}
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <FormInput
        name="interestMaxGraceNumber"
        textAlign="right"
        label={t['loanProductMaxInstallmentInterest']}
        rules={{
          min: {
            value: principalMaxGraceNumber,
            message: 'Maximum principal grace amount should be greater than minimum amount',
          },
        }}
        isDisabled={router?.asPath?.includes('/edit')}
      />
    </FormSection>
  );
};
