import { Box, DetailsCard } from '@myra-ui';

interface ProductLoanRepaymentProps {
  interest: number | undefined | null;
  principal: number | undefined | null;
}

export const ProductLoanRepayment = ({ principal, interest }: ProductLoanRepaymentProps) => (
  <DetailsCard title="Loan Repayment Start Grace Duration">
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <ul>
        <li>
          Grace period on Principal: &nbsp;
          <b>{principal}</b>
        </li>
        <li>
          Day Grace period on Interest: &nbsp;
          <b>{interest}</b>
        </li>
      </ul>
    </Box>
  </DetailsCard>
);
