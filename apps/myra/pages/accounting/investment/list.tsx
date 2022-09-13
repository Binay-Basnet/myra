import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { Box, WIPState } from '@coop/shared/ui';

const InvestmentList = () => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );

InvestmentList.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default InvestmentList;
