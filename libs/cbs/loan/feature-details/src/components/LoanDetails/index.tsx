import { Box, DetailsCard } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanDetails = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <DetailsCard title="Loan Details">
      <Box px="s16" fontSize="r1">
        <ul>
          <li>
            Applied Loan Amount:{' '}
            <b>{amountConverter(loanPreview?.loanDetails?.appliedLoanAmount ?? 0)}</b>
          </li>
          <li>
            Total Collateral Valuation:{' '}
            <b>{amountConverter(loanPreview?.loanDetails?.totalCollateralValuation ?? 0)}</b>
          </li>
          <li>
            Total Guarantee Valuation:{' '}
            <b>{amountConverter(loanPreview?.loanDetails?.totalGuaranteeValuation ?? 0)}</b>
          </li>
          <li>
            Total Processing Charges:{' '}
            <b>{amountConverter(loanPreview?.loanDetails?.totalProcessingChargesValuation ?? 0)}</b>
          </li>
          <li>
            Total Sanctioned Amount:{' '}
            <b>{amountConverter(loanPreview?.loanDetails?.totalSanctionedAmount ?? 0)}</b>
          </li>
        </ul>
      </Box>
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          <li>
            Interest Method: <b>{loanPreview?.loanDetails?.interestMethod}</b>
          </li>
          <li>
            Interest Rate: <b>{loanPreview?.loanDetails?.interestRate} %</b>
          </li>
          <li>
            Loan Repayment Scheme: <b>{loanPreview?.loanDetails?.loanRepaymentScheme ?? '-'}</b>
          </li>
          <li>
            Tenure:{' '}
            <b>
              {loanPreview?.loanDetails?.tenure} {loanPreview?.loanDetails?.tenureUnit}
            </b>
          </li>
          <li>
            Grace Period: <b>{loanPreview?.loanDetails?.principalGracePeriod ?? '-'}</b>
          </li>
        </ul>
      </Box>
    </DetailsCard>
  );
};
