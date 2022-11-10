import { Text } from '@coop/shared/ui';

import { LoanAccountList, LoanPaymentTable } from '../components';

export const Loan = () => (
  <>
    <Text fontSize="r3" fontWeight="600">
      Loans
    </Text>
    <LoanAccountList />
    <LoanPaymentTable />
  </>
);
