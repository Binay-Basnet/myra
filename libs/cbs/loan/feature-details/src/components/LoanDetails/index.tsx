import { Box, DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanDetails = () => {
  const { loan, loanProduct } = useLoanDetails();

  return (
    <DetailsCard title="Loan Details">
      <Box px="s16" fontSize="r1">
        <ul>
          <li>
            Applied Loan Amount: <b>{loan?.appliedLoanAmount}</b>
          </li>
          <li>
            Total Collateral Valuation: <b>{loan?.totalValuation}</b>
          </li>
          <li>
            Total Guarantee Valuation: <b>{loan?.totalValuation}</b>
          </li>
          <li>
            Total Processing Charges:{' '}
            <b>{loan?.loanProcessingCharge?.reduce((a, b) => a + Number(b?.amount), 0)}</b>
          </li>
          <li>
            Total Sanctioned Amount: <b>{loan?.totalSanctionedAmount}</b>
          </li>
        </ul>
      </Box>
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          <li>
            Interest Method: <b>{loanProduct?.interestMethod?.toLowerCase()}</b>
          </li>
          <li>
            Interest Rate: <b>{loan?.intrestRate} %</b>
          </li>
          <li>
            Loan Repayment Scheme: <b>{loan?.repaymentScheme ?? '-'}</b>
          </li>
          <li>
            Tenure:{' '}
            <b>
              {loan?.tenure} {loanProduct?.tenureUnit}
            </b>
          </li>
          <li>
            Grace Period: <b>{loan?.gracePeriod?.installmentNo ?? '-'}</b>
          </li>
        </ul>
      </Box>
    </DetailsCard>
  );
};
