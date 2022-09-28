import { Box, DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanDetails = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <DetailsCard title="Loan Details">
      <Box px="s16" fontSize="r1">
        <ul>
          <li>
            Applied Loan Amount: <b>{loanPreview?.loanDetails?.appliedLoanAmount}</b>
          </li>
          <li>
            Total Collateral Valuation: <b>{loanPreview?.loanDetails?.totalCollateralValuation}</b>
          </li>
          <li>
            Total Guarantee Valuation: <b>{loanPreview?.loanDetails?.totalGuaranteeValuation}</b>
          </li>
          <li>
            Total Processing Charges:{' '}
            <b>{loanPreview?.loanDetails?.totalProcessingChargesValuation}</b>
          </li>
          <li>
            Total Sanctioned Amount: <b>{loanPreview?.loanDetails?.totalSanctionedAmount}</b>
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
            Grace Period: <b>{loanPreview?.loanDetails?.appliedLoanAmount ?? '-'}</b>
          </li>
        </ul>
      </Box>
    </DetailsCard>
  );
};
