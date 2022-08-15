import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { WorkInProgress } from '@coop/shared/components';
import { Box } from '@coop/shared/ui';

const InvestmentList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );
};

InvestmentList.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default InvestmentList;
