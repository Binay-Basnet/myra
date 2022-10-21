import { LoanRepaymentScheme } from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { Alert, Box, Text } from '@coop/shared/ui';

import { useLoanProductContext } from '../hooks/useLoanProduct';

const loanRepaymentObj = {
  [LoanRepaymentScheme.Emi]: 'EMI',
  [LoanRepaymentScheme.Epi]: 'EPI',
  [LoanRepaymentScheme.Flat]: 'FLAT',
};

export const LoanRepaymentSchemeComponent = () => {
  const { product } = useLoanProductContext();

  const LoanRepaymentOptions =
    product?.repaymentScheme?.map((r) => ({
      label: loanRepaymentObj[r ?? LoanRepaymentScheme.Emi],
      value: r as LoanRepaymentScheme,
    })) ?? [];

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Text fontSize="r1" fontWeight="500">
        Loan Repayment Scheme
      </Text>
      <Box display="flex" flexDirection="column" gap="s8">
        <FormSwitchTab name="repaymentScheme" options={LoanRepaymentOptions} />
        <Alert status="info" hideCloseIcon>
          <Text fontWeight="400" fontSize="r1">
            Interest Method: <b>{product?.interestMethod}</b>
          </Text>
        </Alert>
      </Box>
    </Box>
  );
};
