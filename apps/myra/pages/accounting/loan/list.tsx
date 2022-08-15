import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { WorkInProgress } from '@coop/shared/components';
import { Box } from '@coop/shared/ui';

const LoanList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );
};

LoanList.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default LoanList;
